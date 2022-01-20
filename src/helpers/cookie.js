// let docCookies = {
//     getItem: function (sKey) {
//         return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
//     },
//     setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
//         if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
//         var sExpires = "";
//         if (vEnd) {
//             switch (vEnd.constructor) {
//                 case Number:
//                     sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
//                     break;
//                 case String:
//                     sExpires = "; expires=" + vEnd;
//                     break;
//                 case Date:
//                     sExpires = "; expires=" + vEnd.toUTCString();
//                     break;
//             }
//         }
//         document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
//         return true;
//     },
//     removeItem: function (sKey, sPath, sDomain) {
//         if (!sKey || !this.hasItem(sKey)) { return false; }
//         document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
//         return true;
//     },
//     hasItem: function (sKey) {
//         return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
//     },
//     keys: /* optional method: you can safely remove it! */ function () {
//         var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
//         for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
//         return aKeys;
//     }
// };

let cookie =  'MUSIC_A_T=1496117878868; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1496117878868; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_R_T=1496117898366; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_R_T=1496117898366; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1496117898366; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1496117878868; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_A_T=1496117878868; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1496117898366; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1496117898366; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_A_T=1496117878868; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1496117878868; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Tue, 8 Mar 2022 08:32:54 GMT; Path=/;MUSIC_R_T=1496117898366; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/neapi/clientlog; HTTPOnly;__csrf=76fe3241386b9fc0dbbe4f4489e2e775; Max-Age=1296010; Expires=Wed, 23 Mar 2022 08:33:04 GMT; Path=/;;MUSIC_A_T=1496117878868; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1496117878868; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1496117898366; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_U=9b15dc5cfe2855e80943e7a7547a21d4f478f4749530e1c7c88eced019241960993166e004087dd3d78b6050a17a35e705925a4e6992f61dfe3f0151024f9e31; Max-Age=15552000; Expires=Sun, 4 Sep 2022 08:32:54 GMT; Path=/; HTTPOnly;MUSIC_A_T=1496117878868; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_A_T=1496117878868; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_R_T=1496117898366; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1496117878868; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1496117898366; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1496117898366; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_R_T=1496117898366; Max-Age=2147483647; Expires=Sun, 26 Mar 2090 11:47:01 GMT; Path=/api/feedback; HTTPOnly;'

cookie = cookie.split(';').filter(item=>!item.includes('Path=')).join(';')
export {cookie}
