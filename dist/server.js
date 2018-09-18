!function(e){var t={};function s(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=5)}([function(e,t,s){"use strict";var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))(function(i,r){function o(e){try{u(n.next(e))}catch(e){r(e)}}function d(e){try{u(n.throw(e))}catch(e){r(e)}}function u(e){e.done?i(e.value):new s(function(t){t(e.value)}).then(o,d)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const i=s(12),r=s(13);const o=new class{constructor(){this._config=r.default}get sqlRequest(){return this._sqlRequest}_sqlRequest(e){return n(this,void 0,void 0,function*(){try{const t=yield i.createConnection(this._config),s=yield t.query(e);return t.end(),s}catch(e){throw e}})}};t.default=o},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(14);const i=new class{constructor(){this._logger=n.createLogger({format:n.format.combine(n.format.timestamp(),n.format.printf(e=>`\n    ${e.timestamp} [${e.level}]: ${e.message}`)),transports:[new n.transports.Console,new n.transports.File({filename:"combined.log"})]})}_info(e){this._logger.info(e)}get info(){return this._info}_error(e,t){let s=e+". ";if(t)for(const e in t)s+=`${e}: ${t[e]}; `;this._logger.error(s)}get error(){return this._error}};t.default=i},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(18);t.base64=n.Base64;const i=e=>"id"===e||"permissions"===e||"status"===e||"birthday"===e||"creationdate"===e||"updatingdate"===e||"likes"===e||"dislikes"===e||"latest"===e||"fwID"===e||"appID"===e||"fullimage"===e;t.getIdFromUrl=((e,t=0)=>{const s=e.split("/");return+s[s.length-(1+t)]}),t.createEntity=(e=>{let s="creationdate, ",n="NOW(), ";for(const r in e)s+=`${r}, `,i(r)?n+=`'${e[r]}', `:Array.isArray(e[r])?n+=`'${t.base64.encode(JSON.stringify(e[r]))}', `:n+=`'${t.base64.encode(e[r])}', `;return{fields:s=s.substring(0,s.length-2),values:n=n.substring(0,n.length-2)}}),t.updateEntity=(e=>{let s="updatingdate = NOW(), ";for(const n in e)i(n)?s+=`${n} = '${e[n]}', `:Array.isArray(e[n])?s+=`${n} = '${t.base64.encode(JSON.stringify(e[n]))}', `:s+=`${n} = '${t.base64.encode(e[n])}', `;return s=s.substring(0,s.length-2)}),t.decodeEntity=(e=>{const s={};Object.assign(s,e);for(const e in s){const n=s[e];if(!i(e)&&n){s[e]=t.base64.decode(n);const i=s[e];i&&(isNaN(+i)||(s[e]=+i))}}return s}),t.setFilters=(e=>{let s="";for(const n in e)i(n)?s+=`${n}=${e[n]} AND `:s+=`${n}='${t.base64.encode(e[n])}' AND `;return s=`WHERE ${s.substring(0,s.length-5)}`})},function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("path")},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(6);global.Promise=n,s(3).config();const i=s(7),r=s(1),o=process.env.PORT;i.default.listen(o,()=>{r.default.info(`Express server listening on port ${o}`)})},function(e,t){e.exports=require("bluebird")},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(8),i=s(9),r=s(10),o=s(11),d=s(15),u=s(20),a=s(21),l=s(22),c=s(23),f=s(24),y=s(25),p=s(26),h=s(27),v=s(28),g=s(29),E=s(30);const w=(new class{constructor(){this.app=n(),this._routePrv=new r.CrmRoutes,this._devRoutes=new o.DevRoutes,this._userApiRoutes=new d.UserApiRoutes,this._newsApiRoutes=new u.NewsApiRoutes,this._fwVersionsApiRoutes=new a.FwVersionsApiRoutes,this._userAdminRoutes=new l.UsersAdminRoutes,this._devicesAdminRoutes=new c.DevicesAdminRoutes,this._projectsAdminRoutes=new f.ProjectsAdminRoutes,this._fwsAdminRoutes=new y.FwsAdminRoutes,this._appsAdminRoutes=new p.AppsAdminRoutes,this._fwVersionsAdminRoutes=new h.FwVersionsAdminRoutes,this._appVersionsAdminRoutes=new v.AppVersionsAdminRoutes,this._newsAdminRoutes=new g.NewsAdminRoutes,this._config(),this._setApiRoutes(),this._setAdminRoutes()}_config(){this.app.use(i.json()),this.app.use(i.urlencoded({extended:!1}))}_setApiRoutes(){this._routePrv.routes(this.app),this._devRoutes.routes(this.app),this._userApiRoutes.routes(this.app),this._newsApiRoutes.routes(this.app),this._fwVersionsApiRoutes.routes(this.app),this._newsAdminRoutes.routes(this.app)}_setAdminRoutes(){this._userAdminRoutes.routes(this.app),this._devicesAdminRoutes.routes(this.app),this._projectsAdminRoutes.routes(this.app),this._fwsAdminRoutes.routes(this.app),this._appsAdminRoutes.routes(this.app),this._fwVersionsAdminRoutes.routes(this.app),this._appVersionsAdminRoutes.routes(this.app)}}).app,m=new E.Server(w);t.default=m},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("body-parser")},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.CrmRoutes=class{routes(e){e.route("/api/support").post((e,t)=>{t.status(200).send({message:"You tried to create a new support report..."})}),e.route("/api/support/history").post((e,t)=>{t.status(200).send({message:"You got the support reports history..."})}),e.route("/api/partners").get((e,t)=>{t.status(200).send({message:"You got the partners list..."})}),e.route("/api/partners/:id").get((e,t)=>{t.status(200).send({message:"You got the single partner detail..."})}),e.route("/api/partners").get((e,t)=>{t.status(200).send({message:"You got the company info..."})}),e.route("/entity").get((e,t)=>{t.status(200).send({message:"GET request successful."})}).post((e,t)=>{t.status(200).send({message:"POST request successful."})}),e.route("/entity/:entityId").get((e,t)=>{t.status(200).send({message:"GET request successful."})}).put((e,t)=>{t.status(200).send({message:"PUT request successful."})}).delete((e,t)=>{t.status(200).send({message:"DELETE request successful."})})}}},function(e,t,s){"use strict";var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))(function(i,r){function o(e){try{u(n.next(e))}catch(e){r(e)}}function d(e){try{u(n.throw(e))}catch(e){r(e)}}function u(e){e.done?i(e.value):new s(function(t){t(e.value)}).then(o,d)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(4),o=s(1);t.DevRoutes=class{routes(e){e.route("/").get((e,t)=>{t.status(200).send("The server works fine...")}),e.route("/getLogs").get((e,t)=>{try{t.sendFile(r.join(__dirname,"/combined.log")),o.default.info(`logs were sent to ${e.ip}`)}catch(s){o.default.error(`failed to send logs tp ${e.ip}`,s),t.status(500).send("logs sending failed...")}}),e.route("/testDbConnection").get((e,t)=>n(this,void 0,void 0,function*(){try{yield i.default.sqlRequest("SELECT * FROM users"),t.status(200).send("db connection is fine!")}catch(e){console.error("test db connection error:"),console.error(e),t.status(500).send("db connection failed...")}})),e.route("/mysqler").post((e,t)=>n(this,void 0,void 0,function*(){try{const s=yield i.default.sqlRequest(e.body.query);t.status(200).send({rows:s})}catch(e){console.error("mysqler error:"),console.error(e),t.status(500).send(e)}}))}}},function(e,t){e.exports=require("promise-mysql")},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),s(3).config();const n={host:process.env.DB_HOST,user:process.env.DB_USER,password:process.env.DB_PASSWORD,database:process.env.DB_DATABASE,port:+process.env.DB_PORT};t.default=n},function(e,t){e.exports=require("winston")},function(e,t,s){"use strict";var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))(function(i,r){function o(e){try{u(n.next(e))}catch(e){r(e)}}function d(e){try{u(n.throw(e))}catch(e){r(e)}}function u(e){e.done?i(e.value):new s(function(t){t(e.value)}).then(o,d)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(1),o=s(16),d=s(2),u=s(19),a=s(4);t.UserApiRoutes=class{routes(e){e.route("/api/user").post((e,t)=>n(this,void 0,void 0,function*(){try{const s=d.createEntity(e.body.query);yield i.default.sqlRequest(`\n                        INSERT INTO users (${s.fields}) VALUES (${s.values});\n                    `),r.default.info(`new user ${e.body.query.login} created`),t.sendStatus(200)}catch(e){r.default.error("new user creation failed",e),t.status(500).send(e)}})),e.route("/api/user/:id").get((e,t)=>n(this,void 0,void 0,function*(){try{const s=d.getIdFromUrl(e.originalUrl);if(yield o.default.verifyToken(s,e)){const e=yield i.default.sqlRequest(`\n                            SELECT *, NULL AS password FROM users WHERE id=${s};\n                        `),n=d.decodeEntity(e[0]);r.default.info(`got user id:${n.id} info`),t.status(200).send({user:n})}else r.default.error(`unauthorized user tried to get user id:${s} info`),t.sendStatus(401)}catch(s){r.default.error(`get user id:${d.getIdFromUrl(e.originalUrl)} info failed`,s),t.status(500).send(s)}})).put((e,t)=>n(this,void 0,void 0,function*(){try{const s=d.getIdFromUrl(e.originalUrl);if(yield o.default.verifyToken(s,e)){const n=d.updateEntity(e.body.query);yield i.default.sqlRequest(`\n                            UPDATE users SET ${n} WHERE id="${s}";\n                        `),r.default.info(`user id:${s} info updated`),t.sendStatus(200)}else r.default.error(`unauthorized user tried to update user id:${s} info`),t.sendStatus(401)}catch(s){r.default.error(`update user id:${d.getIdFromUrl(e.originalUrl)} info failed`,s),t.status(500).send(s)}})).delete((e,t)=>n(this,void 0,void 0,function*(){try{const s=d.getIdFromUrl(e.originalUrl);(yield o.default.verifyToken(s,e))?(yield i.default.sqlRequest(`\n                            DELETE FROM users WHERE id="${s}";\n                        `),r.default.info(`user id:${s} deleted`),t.sendStatus(200)):(r.default.error(`unauthorized user tried to delete user id:${s} info`),t.sendStatus(401))}catch(s){r.default.error(`delete user id:${d.getIdFromUrl(e.originalUrl)} failed`,s),t.status(500).send(s)}})),e.route("/api/user/login").post((e,t)=>n(this,void 0,void 0,function*(){try{const s=yield o.default.login(e.body.query);s?(yield i.default.sqlRequest(`\n                            UPDATE users SET status = 'online' WHERE id = ${s.id};\n                        `),r.default.info(`user id:${s.id} login`),t.status(200).send(s)):(r.default.info("incorrect password"),t.sendStatus(401))}catch(e){r.default.error("login failed",e),t.status(500).send(e)}})),e.route("/api/user/logout/:id").get((e,t)=>n(this,void 0,void 0,function*(){try{const s=d.getIdFromUrl(e.originalUrl);(yield o.default.verifyToken(s,e))?(yield i.default.sqlRequest(`\n                            UPDATE users SET status = 'offline' WHERE id = ${s};\n                        `),r.default.info(`user id:${s} logout`),t.sendStatus(200)):(r.default.error(`unauthorized user tried to logout user id:${s} info`),t.sendStatus(401))}catch(s){r.default.error(`user id:${d.getIdFromUrl(e.originalUrl)} logout failed`,s),t.status(500).send(s)}})),e.route("/api/user/:id/checking-update").post((e,t)=>n(this,void 0,void 0,function*(){try{const s=d.getIdFromUrl(e.originalUrl,1);if(yield o.default.verifyToken(s,e))if(e.body&&e.body.query&&e.body.query.brand&&e.body.query.model){const n=yield i.default.sqlRequest("\n                                SELECT * FROM fwversions WHERE fullimage = 0;\n                            ");if(n.length){const e=d.decodeEntity(n[n.length-1]);r.default.info(`current fw version info was sent to user id:${s}`),t.status(200).send(e)}else r.default.error(`there is no fw versions for user's id:${s} device`,e.body.query),t.status(204).send("There is no firmware versions for your device")}else r.default.error(`not enough data to get the current fw version info for user id:${s}`,e.body.query),t.status(412).send("Not enough data to get the current firmware version info. You must specify: brand, model");else r.default.error("unauthorized user tried to get fw versions info",e),t.sendStatus(401)}catch(s){r.default.error(`current fw version info sending to user id:${d.getIdFromUrl(e.originalUrl)} failed`,s),t.status(500).send(s)}})),e.route("/api/user/:id/update").post((e,t)=>n(this,void 0,void 0,function*(){try{const s=d.getIdFromUrl(e.originalUrl,1);if(yield o.default.verifyToken(s,e))if(e.body&&e.body.query&&e.body.query.brand&&e.body.query.model&&"isRoot"in e.body.query)if(e.body.query.isRoot)t.status(200).send("temporarily unavailable...");else{const n=yield i.default.sqlRequest("\n                                    SELECT * FROM fwversions WHERE fullimage = 1 AND ;\n                                ");if(n.length){const s=d.decodeEntity(n[n.length-1]),i=a.join(__dirname,`update/${e.body.query.brand}/${e.body.query.model}/${s.version.substring(0,s.version.length-1)}/fullimage/${s.version}.txt`);u.stat(i,(e,s)=>{e||!s.isFile()?(r.default.error("incorrect version request",e),t.sendStatus(404)):t.sendFile(i)}),t.sendStatus(200)}else r.default.error(`there is no fw versions for user's id:${s} device`,e.body.query),t.status(204).send("There is no firmware versions for your device")}else"isRoot"in e.body.query?(r.default.error(`not enough data to get the current fw version info for user id:${s}`,e.body.query),t.status(412).send("Not enough data to get the current firmware version info. You must specify: brand, model")):(r.default.error(`there is no isRoot info in request from user id:${s}`,e.body.query),t.status(412).send("Your aplication can't send correct request"));else r.default.error("unauthorized user tried to update fw version"),t.sendStatus(401)}catch(s){r.default.error(`fw version updating by user id:${d.getIdFromUrl(e.originalUrl,1)} failed`,s),t.status(500).send(s)}}))}}},function(e,t,s){"use strict";var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))(function(i,r){function o(e){try{u(n.next(e))}catch(e){r(e)}}function d(e){try{u(n.throw(e))}catch(e){r(e)}}function u(e){e.done?i(e.value):new s(function(t){t(e.value)}).then(o,d)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const i=s(17),r=s(2),o=s(0);const d=new class{get login(){return this._login}get verifyToken(){return this._verifyToken}_login(e){return n(this,void 0,void 0,function*(){try{const t=yield o.default.sqlRequest(`\n                SELECT login, id FROM users WHERE password="${r.base64.encode(e.password)}";\n            `);return!!t[0]&&{token:i(`Bearer: ${e.login}`).toString(),id:t[0].id}}catch(e){throw e}})}_verifyToken(e,t){return n(this,void 0,void 0,function*(){try{if(t.headers||t.headers.authorization){const s=yield o.default.sqlRequest(`\n                    SELECT login FROM users WHERE id="${e}";\n                `);return!(!s[0]||t.headers.authorization!==i(`Bearer: ${r.base64.decode(s[0].login)}`).toString())}return!1}catch(e){throw e}})}};t.default=d},function(e,t){e.exports=require("crypto-js/md5")},function(e,t){e.exports=require("js-base64")},function(e,t){e.exports=require("fs")},function(e,t,s){"use strict";var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))(function(i,r){function o(e){try{u(n.next(e))}catch(e){r(e)}}function d(e){try{u(n.throw(e))}catch(e){r(e)}}function u(e){e.done?i(e.value):new s(function(t){t(e.value)}).then(o,d)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(1),o=s(2);t.NewsApiRoutes=class{routes(e){e.route("/api/news").get((e,t)=>n(this,void 0,void 0,function*(){try{let s="";Object.keys(e.query).length&&(s=o.setFilters(e.query));const n=yield i.default.sqlRequest(`\n                        SELECT * FROM news ${s};\n                    `);for(let e=0;e<n.length;e++)n[e]=o.decodeEntity(n[e]);r.default.info("news were sent"),t.status(200).send(n)}catch(e){r.default.error("news sending failed",e),t.status(500).send(e)}})),e.route("/api/news/:id").get((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=yield i.default.sqlRequest(`\n                        SELECT * FROM news WHERE id=${s};\n                    `),d=o.decodeEntity(n[0]);r.default.info(`the new id:${s} was sent`),t.status(200).send(d)}catch(s){r.default.error(`new id:${o.getIdFromUrl(e.originalUrl)} sending failed`,s),t.status(500).send(s)}}))}}},function(e,t,s){"use strict";var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))(function(i,r){function o(e){try{u(n.next(e))}catch(e){r(e)}}function d(e){try{u(n.throw(e))}catch(e){r(e)}}function u(e){e.done?i(e.value):new s(function(t){t(e.value)}).then(o,d)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(1),o=s(2);t.FwVersionsApiRoutes=class{routes(e){e.route("/api/fw-versions").get((e,t)=>n(this,void 0,void 0,function*(){try{let s="";Object.keys(e.query).length&&(s=o.setFilters(e.query));const n=yield i.default.sqlRequest(`\n                        SELECT * FROM fwversions ${s};\n                    `);for(let e=0;e<n.length;e++)n[e]=o.decodeEntity(n[e]);r.default.info("fw-versions were sent to user"),t.status(200).send(n)}catch(e){r.default.error("fw-versions sending to user failed",e),t.status(500).send(e)}})),e.route("/api/fw-versions/:id").get((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=yield i.default.sqlRequest(`\n                        SELECT * FROM fwversions WHERE id=${s};\n                    `),d=o.decodeEntity(n[0]);r.default.info(`version id:${s} was sent to user`),t.status(200).send(d)}catch(s){r.default.error(`version id:${o.getIdFromUrl(e.originalUrl)} sending to user failed`,s),t.status(500).send(s)}})),e.route("/api/fw-versions/update").get((e,t)=>n(this,void 0,void 0,function*(){try{let s="";Object.keys(e.query).length&&(s=o.setFilters(e.query));const n=yield i.default.sqlRequest(`\n                        SELECT * FROM fwversions ${s};\n                    `);for(let e=0;e<n.length;e++)n[e]=o.decodeEntity(n[e]);r.default.info("versions were sent to user"),t.status(200).send(n)}catch(e){r.default.error("versions sending to user failed",e),t.status(500).send(e)}})),e.route("/api/fw-versions/update/:id").get((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=yield i.default.sqlRequest(`\n                        SELECT * FROM fwversions WHERE id=${s};\n                    `),d=o.decodeEntity(n[0]);r.default.info(`version id:${s} was sent to user`),t.status(200).send(d)}catch(s){r.default.error(`version id:${o.getIdFromUrl(e.originalUrl)} sending to user failed`,s),t.status(500).send(s)}}))}}},function(e,t,s){"use strict";var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))(function(i,r){function o(e){try{u(n.next(e))}catch(e){r(e)}}function d(e){try{u(n.throw(e))}catch(e){r(e)}}function u(e){e.done?i(e.value):new s(function(t){t(e.value)}).then(o,d)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(1),o=s(2);t.UsersAdminRoutes=class{routes(e){e.route("/api/admin/users").get((e,t)=>n(this,void 0,void 0,function*(){try{let s="";Object.keys(e.query).length&&(s=o.setFilters(e.query));const n=yield i.default.sqlRequest(`\n                        SELECT * FROM users ${s};\n                    `);for(let e=0;e<n.length;e++)n[e]=o.decodeEntity(n[e]);r.default.info("users were sent to admin"),t.status(200).send(n)}catch(e){r.default.error("users sending to admin failed",e),t.status(500).send(e)}})).post((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.createEntity(e.body.query);yield i.default.sqlRequest(`\n                        INSERT INTO users (${s.fields}) VALUES (${s.values});\n                    `),r.default.info(`new user "${e.body.query.login}" created by admin`),t.sendStatus(200)}catch(e){r.default.error("new user creation failed",e),t.status(500).send(e)}})),e.route("/api/admin/users/:id").get((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=yield i.default.sqlRequest(`\n                        SELECT * FROM users WHERE id=${s};\n                    `),d=o.decodeEntity(n[0]);r.default.info(`user id:${s} was sent to admin`),t.status(200).send(d)}catch(s){r.default.error(`user id:${o.getIdFromUrl(e.originalUrl)} sending to admin failed`,s),t.status(500).send(s)}})).put((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=o.updateEntity(e.body.query);yield i.default.sqlRequest(`\n                        UPDATE users SET ${n} WHERE id="${s}";\n                    `),r.default.info(`user id:${s} updated`),t.sendStatus(200)}catch(s){r.default.error(`update user id:${o.getIdFromUrl(e.originalUrl)} failed`,s),t.status(500).send(s)}})).delete((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl);yield i.default.sqlRequest(`\n                        DELETE FROM users WHERE id="${s}";\n                    `),r.default.info(`user id:${s} deleted by admin`),t.sendStatus(200)}catch(s){r.default.error(`delete user id:${o.getIdFromUrl(e.originalUrl)} by admin failed`,s),t.status(500).send(s)}}))}}},function(e,t,s){"use strict";var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))(function(i,r){function o(e){try{u(n.next(e))}catch(e){r(e)}}function d(e){try{u(n.throw(e))}catch(e){r(e)}}function u(e){e.done?i(e.value):new s(function(t){t(e.value)}).then(o,d)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(1),o=s(2);t.DevicesAdminRoutes=class{routes(e){e.route("/api/admin/devices").get((e,t)=>n(this,void 0,void 0,function*(){try{let s="";Object.keys(e.query).length&&(s=o.setFilters(e.query));const n=yield i.default.sqlRequest(`\n                        SELECT * FROM devices ${s};\n                    `);for(let e=0;e<n.length;e++)n[e]=o.decodeEntity(n[e]);r.default.info("devices were sent to admin"),t.status(200).send(n)}catch(e){r.default.error("devices sending to admin failed",e),t.status(500).send(e)}})).post((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.createEntity(e.body.query);yield i.default.sqlRequest(`\n                        INSERT INTO devices (${s.fields}) VALUES (${s.values});\n                    `),r.default.info(`new device "${e.body.query.imei}" created by admin`),t.sendStatus(200)}catch(e){r.default.error("new device creation failed",e),t.status(500).send(e)}})),e.route("/api/admin/devices/:id").get((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=yield i.default.sqlRequest(`\n                        SELECT * FROM devices WHERE id=${s};\n                    `),d=o.decodeEntity(n[0]);r.default.info(`device id:${s} was sent to admin`),t.status(200).send(d)}catch(s){r.default.error(`device id:${o.getIdFromUrl(e.originalUrl)} sending to admin failed`,s),t.status(500).send(s)}})).put((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=o.updateEntity(e.body.query);yield i.default.sqlRequest(`\n                        UPDATE devices SET ${n} WHERE id="${s}";\n                    `),r.default.info(`device id:${s} updated`),t.sendStatus(200)}catch(s){r.default.error(`update device id:${o.getIdFromUrl(e.originalUrl)} failed`,s),t.status(500).send(s)}})).delete((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl);yield i.default.sqlRequest(`\n                        DELETE FROM devices WHERE id="${s}";\n                    `),r.default.info(`device id:${s} deleted by admin`),t.sendStatus(200)}catch(s){r.default.error(`delete device id:${o.getIdFromUrl(e.originalUrl)} by admin failed`,s),t.status(500).send(s)}}))}}},function(e,t,s){"use strict";var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))(function(i,r){function o(e){try{u(n.next(e))}catch(e){r(e)}}function d(e){try{u(n.throw(e))}catch(e){r(e)}}function u(e){e.done?i(e.value):new s(function(t){t(e.value)}).then(o,d)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(1),o=s(2);t.ProjectsAdminRoutes=class{routes(e){e.route("/api/admin/projects").get((e,t)=>n(this,void 0,void 0,function*(){try{let s="";Object.keys(e.query).length&&(s=o.setFilters(e.query));const n=yield i.default.sqlRequest(`\n                        SELECT * FROM projects ${s};\n                    `);for(let e=0;e<n.length;e++)n[e]=o.decodeEntity(n[e]);r.default.info("projects were sent to admin"),t.status(200).send(n)}catch(e){r.default.error("projects sending to admin failed",e),t.status(500).send(e)}})).post((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.createEntity(e.body.query);yield i.default.sqlRequest(`\n                        INSERT INTO projects (${s.fields}) VALUES (${s.values});\n                    `),r.default.info(`new project "${e.body.query.name}" created by admin`),t.sendStatus(200)}catch(e){r.default.error("new project creation failed",e),t.status(500).send(e)}})),e.route("/api/admin/projects/:id").get((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=yield i.default.sqlRequest(`\n                        SELECT * FROM projects WHERE id=${s};\n                    `),d=o.decodeEntity(n[0]);r.default.info(`project id:${s} was sent to admin`),t.status(200).send(d)}catch(s){r.default.error(`project id:${o.getIdFromUrl(e.originalUrl)} sending to admin failed`,s),t.status(500).send(s)}})).put((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=o.updateEntity(e.body.query);yield i.default.sqlRequest(`\n                        UPDATE projects SET ${n} WHERE id="${s}";\n                    `),r.default.info(`project id:${s} updated`),t.sendStatus(200)}catch(s){r.default.error(`update project id:${o.getIdFromUrl(e.originalUrl)} failed`,s),t.status(500).send(s)}})).delete((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl);yield i.default.sqlRequest(`\n                        DELETE FROM projects WHERE id="${s}";\n                    `),r.default.info(`project id:${s} deleted by admin`),t.sendStatus(200)}catch(s){r.default.error(`delete project id:${o.getIdFromUrl(e.originalUrl)} by admin failed`,s),t.status(500).send(s)}}))}}},function(e,t,s){"use strict";var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))(function(i,r){function o(e){try{u(n.next(e))}catch(e){r(e)}}function d(e){try{u(n.throw(e))}catch(e){r(e)}}function u(e){e.done?i(e.value):new s(function(t){t(e.value)}).then(o,d)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(1),o=s(2);t.FwsAdminRoutes=class{routes(e){e.route("/api/admin/fws").get((e,t)=>n(this,void 0,void 0,function*(){try{let s="";Object.keys(e.query).length&&(s=o.setFilters(e.query));const n=yield i.default.sqlRequest(`\n                        SELECT * FROM fws ${s};\n                    `);for(let e=0;e<n.length;e++)n[e]=o.decodeEntity(n[e]);r.default.info("fws were sent to admin"),t.status(200).send(n)}catch(e){r.default.error("fws sending failed",e),t.status(500).send(e)}})).post((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.createEntity(e.body.query);yield i.default.sqlRequest(`\n                        INSERT INTO fws (${s.fields}) VALUES (${s.values});\n                    `),r.default.info(`new fw "${e.body.query.name}" created`),t.sendStatus(200)}catch(e){r.default.error("new fw creation failed",e),t.status(500).send(e)}})),e.route("/api/admin/fws/:id").get((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=yield i.default.sqlRequest(`\n                        SELECT * FROM fws WHERE id=${s};\n                    `),d=o.decodeEntity(n[0]);r.default.info(`fw id:${s} was sent to admin`),t.status(200).send(d)}catch(s){r.default.error(`fw id:${o.getIdFromUrl(e.originalUrl)} sending failed`,s),t.status(500).send(s)}})).put((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=o.updateEntity(e.body.query);yield i.default.sqlRequest(`\n                        UPDATE fws SET ${n} WHERE id="${s}";\n                    `),r.default.info(`fw id:${s} updated`),t.sendStatus(200)}catch(s){r.default.error(`update fw id:${o.getIdFromUrl(e.originalUrl)} failed`,s),t.status(500).send(s)}})).delete((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl);yield i.default.sqlRequest(`\n                        DELETE FROM fws WHERE id="${s}";\n                    `),r.default.info(`fw id:${s} deleted`),t.sendStatus(200)}catch(s){r.default.error(`delete fw id:${o.getIdFromUrl(e.originalUrl)} failed`,s),t.status(500).send(s)}}))}}},function(e,t,s){"use strict";var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))(function(i,r){function o(e){try{u(n.next(e))}catch(e){r(e)}}function d(e){try{u(n.throw(e))}catch(e){r(e)}}function u(e){e.done?i(e.value):new s(function(t){t(e.value)}).then(o,d)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(1),o=s(2);t.AppsAdminRoutes=class{routes(e){e.route("/api/admin/apps").get((e,t)=>n(this,void 0,void 0,function*(){try{let s="";Object.keys(e.query).length&&(s=o.setFilters(e.query));const n=yield i.default.sqlRequest(`\n                        SELECT * FROM apps ${s};\n                    `);for(let e=0;e<n.length;e++)n[e]=o.decodeEntity(n[e]);r.default.info("apps were sent to admin"),t.status(200).send(n)}catch(e){r.default.error("apps sending failed",e),t.status(500).send(e)}})).post((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.createEntity(e.body.query);yield i.default.sqlRequest(`\n                        INSERT INTO apps (${s.fields}) VALUES (${s.values});\n                    `),r.default.info(`new app "${e.body.query.name}" created`),t.sendStatus(200)}catch(e){r.default.error("new app creation failed",e),t.status(500).send(e)}})),e.route("/api/admin/apps/:id").get((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=yield i.default.sqlRequest(`\n                        SELECT * FROM apps WHERE id=${s};\n                    `),d=o.decodeEntity(n[0]);r.default.info(`app id:${s} was sent to admin`),t.status(200).send(d)}catch(s){r.default.error(`app id:${o.getIdFromUrl(e.originalUrl)} sending failed`,s),t.status(500).send(s)}})).put((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=o.updateEntity(e.body.query);yield i.default.sqlRequest(`\n                        UPDATE apps SET ${n} WHERE id="${s}";\n                    `),r.default.info(`app id:${s} updated`),t.sendStatus(200)}catch(s){r.default.error(`update app id:${o.getIdFromUrl(e.originalUrl)} failed`,s),t.status(500).send(s)}})).delete((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl);yield i.default.sqlRequest(`\n                        DELETE FROM apps WHERE id="${s}";\n                    `),r.default.info(`app id:${s} deleted`),t.sendStatus(200)}catch(s){r.default.error(`delete app id:${o.getIdFromUrl(e.originalUrl)} failed`,s),t.status(500).send(s)}}))}}},function(e,t,s){"use strict";var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))(function(i,r){function o(e){try{u(n.next(e))}catch(e){r(e)}}function d(e){try{u(n.throw(e))}catch(e){r(e)}}function u(e){e.done?i(e.value):new s(function(t){t(e.value)}).then(o,d)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(1),o=s(2);t.FwVersionsAdminRoutes=class{routes(e){e.route("/api/admin/fw-versions").get((e,t)=>n(this,void 0,void 0,function*(){try{let s="";Object.keys(e.query).length&&(s=o.setFilters(e.query));const n=yield i.default.sqlRequest(`\n                        SELECT * FROM fwversions ${s};\n                    `);for(let e=0;e<n.length;e++)n[e]=o.decodeEntity(n[e]);r.default.info("fw-versions were sent to admin"),t.status(200).send(n)}catch(e){r.default.error("fw-versions sending failed",e),t.status(500).send(e)}})).post((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.createEntity(e.body.query);yield i.default.sqlRequest(`\n                        INSERT INTO fwversions (${s.fields}) VALUES (${s.values});\n                    `),r.default.info(`new fw-version "${e.body.query.version}" created`),t.sendStatus(200)}catch(e){r.default.error("new fw-version creation failed",e),t.status(500).send(e)}})),e.route("/api/admin/fw-versions/:id").get((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=yield i.default.sqlRequest(`\n                        SELECT * FROM fwversions WHERE id=${s};\n                    `),d=o.decodeEntity(n[0]);r.default.info(`fw-version id:${s} was sent to admin`),t.status(200).send(d)}catch(s){r.default.error(`fw-version id:${o.getIdFromUrl(e.originalUrl)} sending failed`,s),t.status(500).send(s)}})).put((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=o.updateEntity(e.body.query);yield i.default.sqlRequest(`\n                        UPDATE fwversions SET ${n} WHERE id="${s}";\n                    `),r.default.info(`fw-version id:${s} updated`),t.sendStatus(200)}catch(s){r.default.error(`update fw-version id:${o.getIdFromUrl(e.originalUrl)} failed`,s),t.status(500).send(s)}})).delete((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl);yield i.default.sqlRequest(`\n                        DELETE FROM fwversions WHERE id="${s}";\n                    `),r.default.info(`fw-version id:${s} deleted`),t.sendStatus(200)}catch(s){r.default.error(`delete fw-version id:${o.getIdFromUrl(e.originalUrl)} failed`,s),t.status(500).send(s)}}))}}},function(e,t,s){"use strict";var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))(function(i,r){function o(e){try{u(n.next(e))}catch(e){r(e)}}function d(e){try{u(n.throw(e))}catch(e){r(e)}}function u(e){e.done?i(e.value):new s(function(t){t(e.value)}).then(o,d)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(1),o=s(2);t.AppVersionsAdminRoutes=class{routes(e){e.route("/api/admin/app-versions").get((e,t)=>n(this,void 0,void 0,function*(){try{let s="";Object.keys(e.query).length&&(s=o.setFilters(e.query));const n=yield i.default.sqlRequest(`\n                        SELECT * FROM appversions ${s};\n                    `);for(let e=0;e<n.length;e++)n[e]=o.decodeEntity(n[e]);r.default.info("app-versions were sent to admin"),t.status(200).send(n)}catch(e){r.default.error("app-versions sending failed",e),t.status(500).send(e)}})).post((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.createEntity(e.body.query);yield i.default.sqlRequest(`\n                        INSERT INTO appversions (${s.fields}) VALUES (${s.values});\n                    `),r.default.info(`new app-version "${e.body.query.version}" created`),t.sendStatus(200)}catch(e){r.default.error("new app-version creation failed",e),t.status(500).send(e)}})),e.route("/api/admin/app-versions/:id").get((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=yield i.default.sqlRequest(`\n                        SELECT * FROM appversions WHERE id=${s};\n                    `),d=o.decodeEntity(n[0]);r.default.info(`app-version id:${s} was sent to admin`),t.status(200).send(d)}catch(s){r.default.error(`app-version id:${o.getIdFromUrl(e.originalUrl)} sending failed`,s),t.status(500).send(s)}})).put((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=o.updateEntity(e.body.query);yield i.default.sqlRequest(`\n                        UPDATE app-versions SET ${n} WHERE id="${s}";\n                    `),r.default.info(`appversion id:${s} updated`),t.sendStatus(200)}catch(s){r.default.error(`update app-version id:${o.getIdFromUrl(e.originalUrl)} failed`,s),t.status(500).send(s)}})).delete((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl);yield i.default.sqlRequest(`\n                        DELETE FROM app-versions WHERE id="${s}";\n                    `),r.default.info(`appversion id:${s} deleted`),t.sendStatus(200)}catch(s){r.default.error(`delete app-version id:${o.getIdFromUrl(e.originalUrl)} failed`,s),t.status(500).send(s)}}))}}},function(e,t,s){"use strict";var n=this&&this.__awaiter||function(e,t,s,n){return new(s||(s=Promise))(function(i,r){function o(e){try{u(n.next(e))}catch(e){r(e)}}function d(e){try{u(n.throw(e))}catch(e){r(e)}}function u(e){e.done?i(e.value):new s(function(t){t(e.value)}).then(o,d)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r=s(1),o=s(2);t.NewsAdminRoutes=class{routes(e){e.route("/api/admin/news").get((e,t)=>n(this,void 0,void 0,function*(){try{let s="";Object.keys(e.query).length&&(s=o.setFilters(e.query));const n=yield i.default.sqlRequest(`\n                        SELECT * FROM news ${s};\n                    `);for(let e=0;e<n.length;e++)n[e]=o.decodeEntity(n[e]);r.default.info("news were sent to admin"),t.status(200).send(n)}catch(e){r.default.error("news sending to admin failed",e),t.status(500).send(e)}})).post((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.createEntity(e.body.query);yield i.default.sqlRequest(`\n                        INSERT INTO news (${s.fields}) VALUES (${s.values});\n                    `),r.default.info(`the new "${e.body.query.title}" created`),t.sendStatus(200)}catch(e){r.default.error("new new creation failed",e),t.status(500).send(e)}})),e.route("/api/admin/news/:id").get((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=yield i.default.sqlRequest(`\n                        SELECT * FROM news WHERE id=${s};\n                    `),d=o.decodeEntity(n[0]);r.default.info(`the new id:${s} was sent to admin`),t.status(200).send(d)}catch(s){r.default.error(`the new id:${o.getIdFromUrl(e.originalUrl)} sending to admin failed`,s),t.status(500).send(s)}})).put((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl),n=o.updateEntity(e.body.query);yield i.default.sqlRequest(`\n                        UPDATE news SET ${n} WHERE id="${s}";\n                    `),r.default.info(`the new id:${s} updated`),t.sendStatus(200)}catch(s){r.default.error(`update the new id:${o.getIdFromUrl(e.originalUrl)} failed`,s),t.status(500).send(s)}})).delete((e,t)=>n(this,void 0,void 0,function*(){try{const s=o.getIdFromUrl(e.originalUrl);yield i.default.sqlRequest(`\n                        DELETE FROM news WHERE id="${s}";\n                    `),r.default.info(`the new id:${s} deleted`),t.sendStatus(200)}catch(s){r.default.error(`delete the new id:${o.getIdFromUrl(e.originalUrl)} failed`,s),t.status(500).send(s)}}))}}},function(e,t){e.exports=require("http")}]);