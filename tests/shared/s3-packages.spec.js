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

const m = require('mochainon');
const Bluebird = require('bluebird');
const request = Bluebird.promisifyAll(require('request'));
const nock = require('nock');
const s3Packages = require('../../lib/shared/s3-packages');

describe('Shared: s3Packages', function() {

  describe('.getRemoteVersions()', function() {

    beforeEach(function() {
      s3Packages.getRemoteVersions.cache.clear();
    });

    describe('given many versions', function() {

      beforeEach(function() {
        nock(s3Packages.BUCKET_URL_PRODUCTION).get('/').reply(200, `
          <ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
            <Name>resin-production-downloads</Name>
            <Prefix/>
            <Marker/>
            <MaxKeys>1000</MaxKeys>
            <IsTruncated>false</IsTruncated>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-darwin-x64.dmg</Key>
              <LastModified>2016-11-28T16:12:28.000Z</LastModified>
              <ETag>"5818b791238e7a03c2128149cbcabfd6"</ETag>
              <Size>73532901</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-darwin-x64.zip</Key>
              <LastModified>2016-11-28T16:52:26.000Z</LastModified>
              <ETag>"e9b4e7350e352298de293bb44aa72e9c"</ETag>
              <Size>154896510</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-linux-x64.zip</Key>
              <LastModified>2016-11-28T18:27:10.000Z</LastModified>
              <ETag>"40e2b620d2aecb87e44c8675f2028d03"</ETag>
              <Size>71186664</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-linux-x86.zip</Key>
              <LastModified>2016-11-28T17:56:56.000Z</LastModified>
              <ETag>"e585bd96708d79845015cc57d86a3f60"</ETag>
              <Size>72576097</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-win32-x64.exe</Key>
              <LastModified>2016-11-28T20:01:43.000Z</LastModified>
              <ETag>"f6134fedb835af59db063810fb511ef0"</ETag>
              <Size>84717856</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-win32-x64.zip</Key>
              <LastModified>2016-11-28T20:21:55.000Z</LastModified>
              <ETag>"8c6db54d2210355563519c67c1618664"</ETag>
              <Size>82056508</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-win32-x86.exe</Key>
              <LastModified>2016-11-28T20:39:43.000Z</LastModified>
              <ETag>"fdcc21ec9a7312b781c03b8d469e843d"</ETag>
              <Size>74151760</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-win32-x86.zip</Key>
              <LastModified>2016-11-28T20:57:31.000Z</LastModified>
              <ETag>"992c2c021575d5909dbe77a759b67464"</ETag>
              <Size>71846504</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-darwin-x64.dmg</Key>
              <LastModified>2017-01-17T00:58:49.000Z</LastModified>
              <ETag>"81a1b5a330a230ca6d89db97b3399420"</ETag>
              <Size>58442097</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-darwin-x64.zip</Key>
              <LastModified>2017-01-17T01:18:56.000Z</LastModified>
              <ETag>"81b438a9f7b2d4c871cfbd5aedd96975"</ETag>
              <Size>139834277</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-linux-x64.zip</Key>
              <LastModified>2017-01-17T02:01:01.000Z</LastModified>
              <ETag>"35660b65233082a10c00828ea1e50c38"</ETag>
              <Size>55960697</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-linux-x86.zip</Key>
              <LastModified>2017-01-17T02:18:20.000Z</LastModified>
              <ETag>"1bafcc0d5d2c8d43bd2ce8948bb51a8b"</ETag>
              <Size>57331229</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-win32-x64.exe</Key>
              <LastModified>2017-01-17T05:48:02.000Z</LastModified>
              <ETag>"b0a6154ec79d17618632ac62eb30b44e"</ETag>
              <Size>84802632</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-win32-x64.zip</Key>
              <LastModified>2017-01-17T06:14:46.000Z</LastModified>
              <ETag>"f25c5dfa8378e608c25fafbe65e90162"</ETag>
              <Size>82235087</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-win32-x86.exe</Key>
              <LastModified>2017-01-17T06:42:58.000Z</LastModified>
              <ETag>"183b6eb648b0a78a1e99c9182f90194e"</ETag>
              <Size>74264232</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-win32-x86.zip</Key>
              <LastModified>2017-01-17T07:05:55.000Z</LastModified>
              <ETag>"d8d860013f038bed3f52534053b08382"</ETag>
              <Size>72042525</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
          </ListBucketResult>
        `);
      });

      afterEach(function() {
        nock.cleanAll();
      });

      it('should resolve all the available versions', function(done) {
        s3Packages.getRemoteVersions(s3Packages.BUCKET_URL_PRODUCTION).then((versions) => {
          m.chai.expect(versions).to.deep.equal([
            '1.0.0-beta.17',
            '1.0.0-beta.18'
          ]);
          done();
        }).catch(done);
      });

    });

    describe('given a version is being uploaded', function() {

      beforeEach(function() {
        nock(s3Packages.BUCKET_URL_PRODUCTION).get('/').reply(200, `
          <ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
            <Name>resin-production-downloads</Name>
            <Prefix/>
            <Marker/>
            <MaxKeys>1000</MaxKeys>
            <IsTruncated>false</IsTruncated>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-darwin-x64.dmg</Key>
              <LastModified>2016-11-28T16:12:28.000Z</LastModified>
              <ETag>"5818b791238e7a03c2128149cbcabfd6"</ETag>
              <Size>73532901</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-darwin-x64.zip</Key>
              <LastModified>2016-11-28T16:52:26.000Z</LastModified>
              <ETag>"e9b4e7350e352298de293bb44aa72e9c"</ETag>
              <Size>154896510</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-linux-x64.zip</Key>
              <LastModified>2016-11-28T18:27:10.000Z</LastModified>
              <ETag>"40e2b620d2aecb87e44c8675f2028d03"</ETag>
              <Size>71186664</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-linux-x86.zip</Key>
              <LastModified>2016-11-28T17:56:56.000Z</LastModified>
              <ETag>"e585bd96708d79845015cc57d86a3f60"</ETag>
              <Size>72576097</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-win32-x64.exe</Key>
              <LastModified>2016-11-28T20:01:43.000Z</LastModified>
              <ETag>"f6134fedb835af59db063810fb511ef0"</ETag>
              <Size>84717856</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-win32-x64.zip</Key>
              <LastModified>2016-11-28T20:21:55.000Z</LastModified>
              <ETag>"8c6db54d2210355563519c67c1618664"</ETag>
              <Size>82056508</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-win32-x86.exe</Key>
              <LastModified>2016-11-28T20:39:43.000Z</LastModified>
              <ETag>"fdcc21ec9a7312b781c03b8d469e843d"</ETag>
              <Size>74151760</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-win32-x86.zip</Key>
              <LastModified>2016-11-28T20:57:31.000Z</LastModified>
              <ETag>"992c2c021575d5909dbe77a759b67464"</ETag>
              <Size>71846504</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-darwin-x64.dmg</Key>
              <LastModified>2017-01-17T00:58:49.000Z</LastModified>
              <ETag>"81a1b5a330a230ca6d89db97b3399420"</ETag>
              <Size>58442097</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-darwin-x64.zip</Key>
              <LastModified>2017-01-17T01:18:56.000Z</LastModified>
              <ETag>"81b438a9f7b2d4c871cfbd5aedd96975"</ETag>
              <Size>139834277</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-linux-x64.zip</Key>
              <LastModified>2017-01-17T02:01:01.000Z</LastModified>
              <ETag>"35660b65233082a10c00828ea1e50c38"</ETag>
              <Size>55960697</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-linux-x86.zip</Key>
              <LastModified>2017-01-17T02:18:20.000Z</LastModified>
              <ETag>"1bafcc0d5d2c8d43bd2ce8948bb51a8b"</ETag>
              <Size>57331229</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-win32-x64.exe</Key>
              <LastModified>2017-01-17T05:48:02.000Z</LastModified>
              <ETag>"b0a6154ec79d17618632ac62eb30b44e"</ETag>
              <Size>84802632</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-win32-x64.zip</Key>
              <LastModified>2017-01-17T06:14:46.000Z</LastModified>
              <ETag>"f25c5dfa8378e608c25fafbe65e90162"</ETag>
              <Size>82235087</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-win32-x86.exe</Key>
              <LastModified>2017-01-17T06:42:58.000Z</LastModified>
              <ETag>"183b6eb648b0a78a1e99c9182f90194e"</ETag>
              <Size>74264232</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
          </ListBucketResult>
        `);
      });

      afterEach(function() {
        nock.cleanAll();
      });

      it('should resolve all the entirely available versions', function(done) {
        s3Packages.getRemoteVersions(s3Packages.BUCKET_URL_PRODUCTION).then((versions) => {
          m.chai.expect(versions).to.deep.equal([
            '1.0.0-beta.17'
          ]);
          done();
        }).catch(done);
      });

    });

    describe('given other programs in the bucket', function() {

      beforeEach(function() {
        nock(s3Packages.BUCKET_URL_PRODUCTION).get('/').reply(200, `
          <ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
            <Name>resin-production-downloads</Name>
            <Prefix/>
            <Marker/>
            <MaxKeys>1000</MaxKeys>
            <IsTruncated>false</IsTruncated>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-darwin-x64.dmg</Key>
              <LastModified>2016-11-28T16:12:28.000Z</LastModified>
              <ETag>"5818b791238e7a03c2128149cbcabfd6"</ETag>
              <Size>73532901</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-darwin-x64.zip</Key>
              <LastModified>2016-11-28T16:52:26.000Z</LastModified>
              <ETag>"e9b4e7350e352298de293bb44aa72e9c"</ETag>
              <Size>154896510</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-linux-x64.zip</Key>
              <LastModified>2016-11-28T18:27:10.000Z</LastModified>
              <ETag>"40e2b620d2aecb87e44c8675f2028d03"</ETag>
              <Size>71186664</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-linux-x86.zip</Key>
              <LastModified>2016-11-28T17:56:56.000Z</LastModified>
              <ETag>"e585bd96708d79845015cc57d86a3f60"</ETag>
              <Size>72576097</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-win32-x64.exe</Key>
              <LastModified>2016-11-28T20:01:43.000Z</LastModified>
              <ETag>"f6134fedb835af59db063810fb511ef0"</ETag>
              <Size>84717856</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-win32-x64.zip</Key>
              <LastModified>2016-11-28T20:21:55.000Z</LastModified>
              <ETag>"8c6db54d2210355563519c67c1618664"</ETag>
              <Size>82056508</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-win32-x86.exe</Key>
              <LastModified>2016-11-28T20:39:43.000Z</LastModified>
              <ETag>"fdcc21ec9a7312b781c03b8d469e843d"</ETag>
              <Size>74151760</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>etcher/1.0.0-beta.17/Etcher-1.0.0-beta.17-win32-x86.zip</Key>
              <LastModified>2016-11-28T20:57:31.000Z</LastModified>
              <ETag>"992c2c021575d5909dbe77a759b67464"</ETag>
              <Size>71846504</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>notEtcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-darwin-x64.dmg</Key>
              <LastModified>2017-01-17T00:58:49.000Z</LastModified>
              <ETag>"81a1b5a330a230ca6d89db97b3399420"</ETag>
              <Size>58442097</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>notEtcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-darwin-x64.zip</Key>
              <LastModified>2017-01-17T01:18:56.000Z</LastModified>
              <ETag>"81b438a9f7b2d4c871cfbd5aedd96975"</ETag>
              <Size>139834277</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>notEtcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-linux-x64.zip</Key>
              <LastModified>2017-01-17T02:01:01.000Z</LastModified>
              <ETag>"35660b65233082a10c00828ea1e50c38"</ETag>
              <Size>55960697</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>notEtcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-linux-x86.zip</Key>
              <LastModified>2017-01-17T02:18:20.000Z</LastModified>
              <ETag>"1bafcc0d5d2c8d43bd2ce8948bb51a8b"</ETag>
              <Size>57331229</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>notEtcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-win32-x64.exe</Key>
              <LastModified>2017-01-17T05:48:02.000Z</LastModified>
              <ETag>"b0a6154ec79d17618632ac62eb30b44e"</ETag>
              <Size>84802632</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>notEtcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-win32-x64.zip</Key>
              <LastModified>2017-01-17T06:14:46.000Z</LastModified>
              <ETag>"f25c5dfa8378e608c25fafbe65e90162"</ETag>
              <Size>82235087</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>notEtcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-win32-x86.exe</Key>
              <LastModified>2017-01-17T06:42:58.000Z</LastModified>
              <ETag>"183b6eb648b0a78a1e99c9182f90194e"</ETag>
              <Size>74264232</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
            <Contents>
              <Key>notEtcher/1.0.0-beta.18/Etcher-1.0.0-beta.18-win32-x86.zip</Key>
              <LastModified>2017-01-17T07:05:55.000Z</LastModified>
              <ETag>"d8d860013f038bed3f52534053b08382"</ETag>
              <Size>72042525</Size>
              <StorageClass>STANDARD</StorageClass>
            </Contents>
          </ListBucketResult>
        `);
      });

      afterEach(function() {
        nock.cleanAll();
      });

      it('should not consider the other packages', function(done) {
        s3Packages.getRemoteVersions(s3Packages.BUCKET_URL_PRODUCTION).then((versions) => {
          m.chai.expect(versions).to.deep.equal([
            '1.0.0-beta.17'
          ]);
          done();
        }).catch(done);
      });

    });

    describe('given an unsuccessful request', function() {

      beforeEach(function() {
        nock(s3Packages.BUCKET_URL_PRODUCTION).get('/').reply(500);
      });

      afterEach(function() {
        nock.cleanAll();
      });

      it('should be rejected with an error', function(done) {
        s3Packages.getRemoteVersions(s3Packages.BUCKET_URL_PRODUCTION).catch((error) => {
          m.chai.expect(error).to.be.an.instanceof(Error);
          done();
        });
      });

    });

    describe('given ENOTFOUND', function() {

      beforeEach(function() {
        const error = new Error('ENOTFOUND');
        error.code = 'ENOTFOUND';

        this.requestGetAsyncStub = m.sinon.stub(request, 'getAsync');
        this.requestGetAsyncStub.returns(Bluebird.reject(error));
      });

      afterEach(function() {
        this.requestGetAsyncStub.restore();
      });

      it('should return an empty array', function(done) {
        s3Packages.getRemoteVersions(s3Packages.BUCKET_URL_PRODUCTION).then((versions) => {
          m.chai.expect(versions).to.deep.equal([]);
          done();
        }).catch(done);
      });

    });

    describe('given ETIMEDOUT', function() {

      beforeEach(function() {
        const error = new Error('ETIMEDOUT');
        error.code = 'ETIMEDOUT';

        this.requestGetAsyncStub = m.sinon.stub(request, 'getAsync');
        this.requestGetAsyncStub.returns(Bluebird.reject(error));
      });

      afterEach(function() {
        this.requestGetAsyncStub.restore();
      });

      it('should return an empty array', function(done) {
        s3Packages.getRemoteVersions(s3Packages.BUCKET_URL_PRODUCTION).then((versions) => {
          m.chai.expect(versions).to.deep.equal([]);
          done();
        }).catch(done);
      });

    });

  });

  describe('.getLatestVersion()', function() {

    describe('given a valid ETCHER_LATEST_VERSION environment variable', function() {

      beforeEach(function() {
        this.getRemoteVersionsStub = m.sinon.stub(s3Packages, 'getRemoteVersions');
        this.getRemoteVersionsStub.returns(Bluebird.resolve([ '1.0.0' ]));

        process.env.ETCHER_LATEST_VERSION = '9.9.9';
      });

      afterEach(function() {
        this.getRemoteVersionsStub.restore();

        Reflect.deleteProperty(process.env, 'ETCHER_LATEST_VERSION');
      });

      it('should resolve the variable', function(done) {
        s3Packages.getLatestVersion(s3Packages.BUCKET_URL_PRODUCTION).then((latestVersion) => {
          m.chai.expect(latestVersion).to.equal('9.9.9');
          done();
        }).catch(done);
      });

    });

    describe('given an invalid ETCHER_LATEST_VERSION environment variable', function() {

      beforeEach(function() {
        this.getRemoteVersionsStub = m.sinon.stub(s3Packages, 'getRemoteVersions');
        this.getRemoteVersionsStub.returns(Bluebird.resolve([
          '1.0.0',
          '2.0.0'
        ]));

        process.env.ETCHER_LATEST_VERSION = 'foo';
      });

      afterEach(function() {
        this.getRemoteVersionsStub.restore();

        Reflect.deleteProperty(process.env, 'ETCHER_LATEST_VERSION');
      });

      it('should resolve the latest remote version', function(done) {
        s3Packages.getLatestVersion(s3Packages.BUCKET_URL_PRODUCTION).then((latestVersion) => {
          m.chai.expect(latestVersion).to.equal('2.0.0');
          done();
        }).catch(done);
      });

    });

    describe('given no remote version', function() {

      beforeEach(function() {
        this.getRemoteVersionsStub = m.sinon.stub(s3Packages, 'getRemoteVersions');
        this.getRemoteVersionsStub.returns(Bluebird.resolve([]));
      });

      afterEach(function() {
        this.getRemoteVersionsStub.restore();
      });

      it('should resolve undefined', function(done) {
        s3Packages.getLatestVersion(s3Packages.BUCKET_URL_PRODUCTION).then((latestVersion) => {
          m.chai.expect(latestVersion).to.be.undefined;
          done();
        }).catch(done);
      });

    });

    describe('given a single version', function() {

      beforeEach(function() {
        this.getRemoteVersionsStub = m.sinon.stub(s3Packages, 'getRemoteVersions');
        this.getRemoteVersionsStub.returns(Bluebird.resolve([ '0.5.0' ]));
      });

      afterEach(function() {
        this.getRemoteVersionsStub.restore();
      });

      it('should resolve the version', function(done) {
        s3Packages.getLatestVersion(s3Packages.BUCKET_URL_PRODUCTION).then((latestVersion) => {
          m.chai.expect(latestVersion).to.equal('0.5.0');
          done();
        }).catch(done);
      });

    });

    describe('given multiple versions', function() {

      beforeEach(function() {
        this.getRemoteVersionsStub = m.sinon.stub(s3Packages, 'getRemoteVersions');
        this.getRemoteVersionsStub.returns(Bluebird.resolve([
          '2.1.0',
          '1.0.0',
          '0.5.0',
          '0.4.0'
        ]));
      });

      afterEach(function() {
        this.getRemoteVersionsStub.restore();
      });

      it('should resolve the latest version', function(done) {
        s3Packages.getLatestVersion(s3Packages.BUCKET_URL_PRODUCTION).then((latestVersion) => {
          m.chai.expect(latestVersion).to.equal('2.1.0');
          done();
        }).catch(done);
      });

    });

    describe('given v1, v2, and v3 remote versions', function() {

      beforeEach(function() {
        this.getRemoteVersionsStub = m.sinon.stub(s3Packages, 'getRemoteVersions');
        this.getRemoteVersionsStub.returns(Bluebird.resolve([
          '3.0.1',
          '3.0.0',
          '2.1.1',
          '2.1.0',
          '2.0.0',
          '1.2.0',
          '1.1.0',
          '1.0.2',
          '1.0.1',
          '1.0.0'
        ]));
      });

      afterEach(function() {
        this.getRemoteVersionsStub.restore();
      });

      it('should be able to resolve the latest v1 version with a semver range', function(done) {
        s3Packages.getLatestVersion(s3Packages.BUCKET_URL_PRODUCTION, {
          range: '<2.0.0'
        }).then((latestVersion) => {
          m.chai.expect(latestVersion).to.equal('1.2.0');
          done();
        }).catch(done);
      });

      it('should be able to resolve the latest v2 version with a semver range', function(done) {
        s3Packages.getLatestVersion(s3Packages.BUCKET_URL_PRODUCTION, {
          range: '>=2.0.0 <3.0.0'
        }).then((latestVersion) => {
          m.chai.expect(latestVersion).to.equal('2.1.1');
          done();
        }).catch(done);
      });

      it('should be able to resolve the latest v3 version with a semver range', function(done) {
        s3Packages.getLatestVersion(s3Packages.BUCKET_URL_PRODUCTION, {
          range: '>=3.0.0'
        }).then((latestVersion) => {
          m.chai.expect(latestVersion).to.equal('3.0.1');
          done();
        }).catch(done);
      });

    });

    describe('given pre-release remote versions', function() {

      beforeEach(function() {
        this.getRemoteVersionsStub = m.sinon.stub(s3Packages, 'getRemoteVersions');
        this.getRemoteVersionsStub.returns(Bluebird.resolve([
          '2.0.0-beta.3',
          '2.0.0-beta.2',
          '2.0.0-beta.1',
          '2.0.0-beta.0',
          '1.0.0-beta.19',
          '1.0.0-beta.18',
          '1.0.0-beta.17',
          '1.0.0-beta.16'
        ]));
      });

      afterEach(function() {
        this.getRemoteVersionsStub.restore();
      });

      it('should be able to resolve the latest v2 pre-release version with a non pre-release semver range', function(done) {
        s3Packages.getLatestVersion(s3Packages.BUCKET_URL_PRODUCTION, {
          range: '>=2.0.0'
        }).then((latestVersion) => {
          m.chai.expect(latestVersion).to.equal('2.0.0-beta.3');
          done();
        }).catch(done);
      });

    });

  });

});
