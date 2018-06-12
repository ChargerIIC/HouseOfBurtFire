'use strict';

import { MailConfig } from './mail.config';
import functions = require('firebase-functions');
import nodemailer = require('nodemailer');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/

const gmailEmail = MailConfig.USERNAME;
const gmailPassword = MailConfig.PASSWORD;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendEmailContact = functions.https.onRequest((request, response) =>{
    const mailOptions = {
        from: request.body.email,
        to: 'HouseOfBurtSoftware@Yahoo.com',
        subject: "Contact Request from HouseOfBurt",
        text: request.body.emailMessage
      };

      return mailTransport.sendMail(mailOptions)
    .then(() => console.log(`New contact email sent from:`, request.body.email))
    .catch((error) => console.error('There was an error while sending the email:', error));

    
});

