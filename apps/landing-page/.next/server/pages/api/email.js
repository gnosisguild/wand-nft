"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/email";
exports.ids = ["pages/api/email"];
exports.modules = {

/***/ "google-spreadsheet":
/*!*************************************!*\
  !*** external "google-spreadsheet" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("google-spreadsheet");

/***/ }),

/***/ "(api)/./pages/api/email.ts":
/*!****************************!*\
  !*** ./pages/api/email.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\nconst { GoogleSpreadsheet  } = __webpack_require__(/*! google-spreadsheet */ \"google-spreadsheet\");\n// This /api/email only supports POST requests.\n// It takes in form encoded data with the field:\n// email: an email address we can use to send updates.\nasync function handler(req, res) {\n    if (req.method === \"POST\") {\n        const { body: { email  } ,  } = req;\n        if (!email) {\n            res.status(400).send(\"You must send an email address\");\n            return;\n        }\n        try {\n            const doc = new GoogleSpreadsheet(process.env[getEnvVar(\"SPREADSHEET_ID\")]);\n            await doc.useServiceAccountAuth({\n                client_email: process.env[getEnvVar(\"GOOGLE_SERVICE_ACCOUNT_EMAIL\")],\n                private_key: process.env[getEnvVar(\"GOOGLE_PRIVATE_KEY\")]?.replace(/\\\\n/g, \"\\n\")\n            });\n            await doc.loadInfo();\n            const greenListSheet = doc.sheetsByIndex[0];\n            const rows = await greenListSheet.getRows();\n            const newRow = await greenListSheet.addRow({\n                email: email\n            });\n            res.status(200).send(`${email} added to list`);\n        } catch (error) {\n            console.log(error.message);\n            res.status(500).send(error.message);\n        }\n    } else {\n        res.status(404).send(\"Not found\");\n    }\n};\nfunction getEnvVar(varName) {\n    if (false) {}\n    return `DEV_${varName}`;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZW1haWwudHMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUVBLEtBQUssQ0FBQyxDQUFDLENBQUNBLGlCQUFpQixFQUFDLENBQUMsR0FBR0MsbUJBQU8sQ0FBQyw4Q0FBb0I7QUFFMUQsRUFBK0M7QUFDL0MsRUFBZ0Q7QUFDaEQsRUFBc0Q7QUFFdkMsZUFBZUMsT0FBTyxDQUNuQ0MsR0FBbUIsRUFDbkJDLEdBQXlCLEVBQ3pCLENBQUM7SUFDRCxFQUFFLEVBQUVELEdBQUcsQ0FBQ0UsTUFBTSxLQUFLLENBQU0sT0FBRSxDQUFDO1FBQzFCLEtBQUssQ0FBQyxDQUFDLENBQ0xDLElBQUksRUFBRSxDQUFDLENBQUNDLEtBQUssRUFBQyxDQUFDLElBQ2pCLENBQUMsR0FBR0osR0FBRztRQUNQLEVBQUUsR0FBR0ksS0FBSyxFQUFFLENBQUM7WUFDWEgsR0FBRyxDQUFDSSxNQUFNLENBQUMsR0FBRyxFQUFFQyxJQUFJLENBQUMsQ0FBZ0M7WUFDckQsTUFBTTtRQUNSLENBQUM7UUFFRCxHQUFHLENBQUMsQ0FBQztZQUNILEtBQUssQ0FBQ0MsR0FBRyxHQUFHLEdBQUcsQ0FBQ1YsaUJBQWlCLENBQy9CVyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsU0FBUyxDQUFDLENBQWdCO1lBRXhDLEtBQUssQ0FBQ0gsR0FBRyxDQUFDSSxxQkFBcUIsQ0FBQyxDQUFDO2dCQUMvQkMsWUFBWSxFQUFFSixPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsU0FBUyxDQUFDLENBQThCO2dCQUNsRUcsV0FBVyxFQUFFTCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsU0FBUyxDQUFDLENBQW9CLHVCQUFJSSxPQUFPLFNBRWhFLENBQUk7WUFFUixDQUFDO1lBQ0QsS0FBSyxDQUFDUCxHQUFHLENBQUNRLFFBQVE7WUFDbEIsS0FBSyxDQUFDQyxjQUFjLEdBQUdULEdBQUcsQ0FBQ1UsYUFBYSxDQUFDLENBQUM7WUFDMUMsS0FBSyxDQUFDQyxJQUFJLEdBQUcsS0FBSyxDQUFDRixjQUFjLENBQUNHLE9BQU87WUFFekMsS0FBSyxDQUFDQyxNQUFNLEdBQUcsS0FBSyxDQUFDSixjQUFjLENBQUNLLE1BQU0sQ0FBQyxDQUFDO2dCQUFDakIsS0FBSyxFQUFFQSxLQUFLO1lBQUMsQ0FBQztZQUUzREgsR0FBRyxDQUFDSSxNQUFNLENBQUMsR0FBRyxFQUFFQyxJQUFJLElBQUlGLEtBQUssQ0FBQyxjQUFjO1FBQzlDLENBQUMsQ0FBQyxLQUFLLEVBQUVrQixLQUFLLEVBQU8sQ0FBQztZQUNwQkMsT0FBTyxDQUFDQyxHQUFHLENBQUNGLEtBQUssQ0FBQ0csT0FBTztZQUN6QnhCLEdBQUcsQ0FBQ0ksTUFBTSxDQUFDLEdBQUcsRUFBRUMsSUFBSSxDQUFDZ0IsS0FBSyxDQUFDRyxPQUFPO1FBQ3BDLENBQUM7SUFDSCxDQUFDLE1BQU0sQ0FBQztRQUNOeEIsR0FBRyxDQUFDSSxNQUFNLENBQUMsR0FBRyxFQUFFQyxJQUFJLENBQUMsQ0FBVztJQUNsQyxDQUFDO0FBQ0gsQ0FBQztTQUVRSSxTQUFTLENBQUNnQixPQUFlLEVBQVUsQ0FBQztJQUMzQyxFQUFFLEVBakRKLEtBaUQyQyxFQUFFLEVBRTFDO0lBQ0QsTUFBTSxFQUFFLElBQUksRUFBRUEsT0FBTztBQUN2QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2FuZC1wb3J0YWwvLi9wYWdlcy9hcGkvZW1haWwudHM/MDZiOSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBOZXh0LmpzIEFQSSByb3V0ZSBzdXBwb3J0OiBodHRwczovL25leHRqcy5vcmcvZG9jcy9hcGktcm91dGVzL2ludHJvZHVjdGlvblxuaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSBcIm5leHRcIjtcbmNvbnN0IHsgR29vZ2xlU3ByZWFkc2hlZXQgfSA9IHJlcXVpcmUoXCJnb29nbGUtc3ByZWFkc2hlZXRcIik7XG5cbi8vIFRoaXMgL2FwaS9lbWFpbCBvbmx5IHN1cHBvcnRzIFBPU1QgcmVxdWVzdHMuXG4vLyBJdCB0YWtlcyBpbiBmb3JtIGVuY29kZWQgZGF0YSB3aXRoIHRoZSBmaWVsZDpcbi8vIGVtYWlsOiBhbiBlbWFpbCBhZGRyZXNzIHdlIGNhbiB1c2UgdG8gc2VuZCB1cGRhdGVzLlxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICByZXM6IE5leHRBcGlSZXNwb25zZTxhbnk+XG4pIHtcbiAgaWYgKHJlcS5tZXRob2QgPT09IFwiUE9TVFwiKSB7XG4gICAgY29uc3Qge1xuICAgICAgYm9keTogeyBlbWFpbCB9LFxuICAgIH0gPSByZXE7XG4gICAgaWYgKCFlbWFpbCkge1xuICAgICAgcmVzLnN0YXR1cyg0MDApLnNlbmQoXCJZb3UgbXVzdCBzZW5kIGFuIGVtYWlsIGFkZHJlc3NcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRvYyA9IG5ldyBHb29nbGVTcHJlYWRzaGVldChcbiAgICAgICAgcHJvY2Vzcy5lbnZbZ2V0RW52VmFyKFwiU1BSRUFEU0hFRVRfSURcIildXG4gICAgICApO1xuICAgICAgYXdhaXQgZG9jLnVzZVNlcnZpY2VBY2NvdW50QXV0aCh7XG4gICAgICAgIGNsaWVudF9lbWFpbDogcHJvY2Vzcy5lbnZbZ2V0RW52VmFyKFwiR09PR0xFX1NFUlZJQ0VfQUNDT1VOVF9FTUFJTFwiKV0sXG4gICAgICAgIHByaXZhdGVfa2V5OiBwcm9jZXNzLmVudltnZXRFbnZWYXIoXCJHT09HTEVfUFJJVkFURV9LRVlcIildPy5yZXBsYWNlKFxuICAgICAgICAgIC9cXFxcbi9nLFxuICAgICAgICAgIFwiXFxuXCJcbiAgICAgICAgKSxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgZG9jLmxvYWRJbmZvKCk7XG4gICAgICBjb25zdCBncmVlbkxpc3RTaGVldCA9IGRvYy5zaGVldHNCeUluZGV4WzBdO1xuICAgICAgY29uc3Qgcm93cyA9IGF3YWl0IGdyZWVuTGlzdFNoZWV0LmdldFJvd3MoKTtcblxuICAgICAgY29uc3QgbmV3Um93ID0gYXdhaXQgZ3JlZW5MaXN0U2hlZXQuYWRkUm93KHsgZW1haWw6IGVtYWlsIH0pO1xuXG4gICAgICByZXMuc3RhdHVzKDIwMCkuc2VuZChgJHtlbWFpbH0gYWRkZWQgdG8gbGlzdGApO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgcmVzLnN0YXR1cyg1MDApLnNlbmQoZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJlcy5zdGF0dXMoNDA0KS5zZW5kKFwiTm90IGZvdW5kXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEVudlZhcih2YXJOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgcmV0dXJuIGBQUk9EXyR7dmFyTmFtZX1gO1xuICB9XG4gIHJldHVybiBgREVWXyR7dmFyTmFtZX1gO1xufVxuIl0sIm5hbWVzIjpbIkdvb2dsZVNwcmVhZHNoZWV0IiwicmVxdWlyZSIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJib2R5IiwiZW1haWwiLCJzdGF0dXMiLCJzZW5kIiwiZG9jIiwicHJvY2VzcyIsImVudiIsImdldEVudlZhciIsInVzZVNlcnZpY2VBY2NvdW50QXV0aCIsImNsaWVudF9lbWFpbCIsInByaXZhdGVfa2V5IiwicmVwbGFjZSIsImxvYWRJbmZvIiwiZ3JlZW5MaXN0U2hlZXQiLCJzaGVldHNCeUluZGV4Iiwicm93cyIsImdldFJvd3MiLCJuZXdSb3ciLCJhZGRSb3ciLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJtZXNzYWdlIiwidmFyTmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/email.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/email.ts"));
module.exports = __webpack_exports__;

})();