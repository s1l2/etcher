/*
 * Copyright 2016 resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const _ = require('lodash');
const semver = require('semver');
const Bluebird = require('bluebird');
const request = Bluebird.promisifyAll(require('request'));
const xml = Bluebird.promisifyAll(require('xml2js'));

/**
 * @summary Etcher production releases S3 bucket URL
 * @constant
 * @public
 * @type {String}
 */
exports.BUCKET_URL_PRODUCTION = 'https://resin-production-downloads.s3.amazonaws.com';

/**
 * @summary Etcher releases S3 package name
 * @constant
 * @private
 * @type {String}
 */
const S3_PACKAGE_NAME = 'etcher';

/**
 * @summary Number of packages per Etcher version
 * @constant
 * @private
 * @type {Number}
 */
const NUMBER_OF_PACKAGES = 8;

/**
 * @summary Get all remote versions from an S3 bucket
 * @function
 * @private
 *
 * @description
 * We memoize based on the assumptions that the received latest version
 * number will not increase while the application is running.
 *
 * @param {String} bucketUrl - s3 bucket url
 * @fulfil {String[]} - remote versions
 * @returns {Promise}
 *
 * @example
 * s3Packages.getRemoteVersions(s3Packages.BUCKET_URL_PRODUCTION).then((versions) => {
 *   _.each(versions, (version) => {
 *     console.log(version);
 *   });
 * });
 */
exports.getRemoteVersions = _.memoize((bucketUrl) => {

  /* eslint-disable lodash/prefer-lodash-method */

  return request.getAsync(bucketUrl)

  /* eslint-enable lodash/prefer-lodash-method */

    .get('body')
    .then(xml.parseStringAsync)
    .get('ListBucketResult')
    .get('Contents')
    .reduce((accumulator, entry) => {
      const [ name, version ] = _.split(_.first(entry.Key), '/');

      if (name === S3_PACKAGE_NAME) {
        if (_.isNil(accumulator[version])) {
          accumulator[version] = 1;
        } else {
          accumulator[version] += 1;
        }
      }

      return accumulator;
    }, [])
    .then((versions) => {
      return _.keys(_.pickBy(versions, (occurrences) => {
        return occurrences >= NUMBER_OF_PACKAGES;
      }));
    })
    .catch({
      code: 'ENOTFOUND'
    }, {
      code: 'ETIMEDOUT'
    }, () => {
      return [];
    });
});

/**
 * @summary Get the latest available version from an S3 bucket
 * @function
 * @public
 *
 * @param {String} bucketUrl - an s3 bucket url
 * @param {Object} options - options
 * @param {String} [options.range] - semver range
 * @fulfil {String} - latest version
 * @returns {Promise}
 *
 * @example
 * s3Packages.getLatestVersion(s3Packages.BUCKET_URL_PRODUCTION, {
 *   range: '>=2.0.0'
 * }).then((latestVersion) => {
 *   console.log(`The latest version is: ${latestVersion}`);
 * });
 */
exports.getLatestVersion = (bucketUrl, options = {}) => {

  // For manual testing purposes
  const ETCHER_LATEST_VERSION = process.env.ETCHER_LATEST_VERSION;
  if (semver.valid(ETCHER_LATEST_VERSION)) {
    return Bluebird.resolve(ETCHER_LATEST_VERSION);
  }

  /* eslint-disable lodash/prefer-lodash-method */

  return exports.getRemoteVersions(bucketUrl).filter((version) => {

  /* eslint-enable lodash/prefer-lodash-method */

    // The `semver` module refuses to apply ranges to prerelease versions
    // As a workaround, we drop the prerelease tags, if any, apply the range
    // on that, and keep using the prerelease tag from then on.
    // See https://github.com/npm/node-semver#prerelease-tags
    const strippedVersion = `${semver.major(version)}.${semver.minor(version)}.${semver.patch(version)}`;

    return semver.satisfies(strippedVersion, options.range || '*');
  }).then((versions) => {
    return _.last(versions.sort(semver.compare));
  });
};
