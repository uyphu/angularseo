/**
 * appConstant.js
 * Author: Phu
 * Date: Apr 10, 2015
 */

'use strict';

/**
 * Constructor.
 */
function AppConstant() {}

/** The Constant CLIENT_ID. */
AppConstant.CLIENT_ID = '218067712879-02m1m14pohu8j1p68q89o3ns3ef07tiv.apps.googleusercontent.com';

/** The Constant SCOPE. */
AppConstant.SCOPE = 'https://www.googleapis.com/auth/userinfo.email';

/** The Constant ROOT_API. */
AppConstant.ROOT_API = 'https://customersapp.appspot.com/_ah/api';//'//' + window.location.host + '/_ah/api';
//AppConstant.ROOT_API = 'http://localhost:9898/_ah/api';//'//' + window.location.host + '/_ah/api';

/** The Constant APP_NAME. */
AppConstant.APP_NAME = 'customersApp';

/** The Constant ENDPOINT_VERSION. */
AppConstant.ENDPOINT_VERSION = 'v1';

/** The Constant OAUTH2_VERSION. */
AppConstant.OAUTH2_VERSION = 'v2';

/** The Constant OAUTH2. */
AppConstant.OAUTH2 = 'oauth2';

/** The Constant OAUTH2. */
AppConstant.MAX_PAGE_SIZE = 10;

/** The Constant OAUTH2_ENDPOINT_LOADED. */
AppConstant.OAUTH2_ENDPOINT_LOADED = false;

/** The Constant USER_LOGIN_ENDPOINT_LOADED. */
AppConstant.USER_LOGIN_ENDPOINT_LOADED = false;

/** The Constant CUSTOMER_ENDPOINT_LOADED. */
AppConstant.CUSTOMER_ENDPOINT_LOADED = false;

/** The Constant STATE_ENDPOINT_LOADED. */
AppConstant.STATE_ENDPOINT_LOADED = false;

/** The Constant ORDER_ENDPOINT_LOADED. */
AppConstant.ORDER_ENDPOINT_LOADED = false;

/** The Constant ENDPOINT_LOADED_NUM. */
AppConstant.ENDPOINT_LOADED_NUM = 4;

/** The Constant ALL_ENDPOINT_LOADED. */
AppConstant.ALL_ENDPOINT_LOADED = false;

/** The Constant API_LOAD_TYPE. */
AppConstant.API_LOAD_TYPE = 0; 