/* 
**                    Lib Version => 2.0
**                  Last Update : 08/06/2021
**                        Dev By : Zanie 
**
**
**
*/


// ===================================================Start of Constanta=====================================================
const token         = "your-bot-token"; // Fill With Your own bot token
const telegramUrl   = "https://api.telegram.org/bot" + token;
const webAppUrl     = "your-webapp-url"; // Fill with your own google app url
const ssId          = "your-spreadsheet"; // Fill with your own spreadsheet ID
const cfgssID       = 'optional' // If you want to make a backup or log spreadsheet seperetly from main spreadsheet, Fill it with your own backup spreadsheet ID. If you don't, just remove this line
const adminID       = 000000 // Your Telegram ID. Use this for debugging. 
// ===================================================End of Constanta========================================================

function getMe() {
  var url       = telegramUrl + "/getMe";
  var response  = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function setWebhook() {
  var url       = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response  = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function sendMessage(id,message_id,text) {
  var url       = telegramUrl + "/sendMessage?chat_id=" + id + '&reply_to_message_id=' + message_id + "&text=" + encodeURIComponent(text);
  var response  = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function sendMarkdown(id,message_id,text,markdown) {
  var url       = telegramUrl + "/sendMessage?chat_id=" + id + '&reply_to_message_id=' + message_id + "&text=" + encodeURIComponent(text) + '&parse_mode=' + markdown;
  var response  = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function sendHTML(id,message_id,text,HTML) {
  var url       = telegramUrl + "/sendMessage?chat_id=" + id + '&reply_to_message_id=' + message_id + "&text=" + encodeURIComponent(text) + '&parse_mode=' + HTML;
  var response  = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function doGet(e) {
  return HtmlService.createHtmlOutput("It's Work");
}

function doPost(e) {
const data        = JSON.parse(e.postData.contents); // Parse data 
const text        = data.message.text;
const id          = data.message.chat.id;
const name        = data.message.from.first_name
                      if(data.message.from.last_name) {
                        name += ' ' + data.message.from.last_name
                      };
const message_id  = data.message.message_id;
const user_id     = data.message.from.id;
const username    = data.message.from.username;
const groupname   = data.message.chat.title;
const type        = data.message.chat.type;
const newMember   = data.message.new_chat_member;
const markdown    = 'markdown';
const HTML        = 'HTML';
const success     = 'Congrats! Your Data Has Been Save To Our Databases';
const failed      = 'Something Wrong With Your Input. Please Try Again Later';

    // If you want bot active in group, Keep this line. If you don't, remove the line below
    if(type == 'supergroup' || 'group') {
      try {
            if(/^#moban #noss/gis.test(text)) {
            var sheetName = 'NOSS';
            var sheet     = SpreadsheetApp.openById(ssId).getSheetByName(sheetName);
            sheet.appendRow([t,id, groupname, user_id, name, username, message_id, text]);
            sendMessage(id, message_id, success);
            }
        } catch(err) {
            sendMessage(id, message_id, failed)
        }
        // END OF #NOSS

        if(/^!help/gis.test(text)) {
            var help        = 'This is a Help Wizard'
            var sheetName   = 'private'; // Save for Logs if needed. Remove it when not needed.
            var shtcfg      = SpreadsheetApp.openById(cfgssID).getSheetByName(sheetName)
            shtcfg.appendRow([t,id, groupname, user_id, name, username, message_id, text]);
            sendMarkdown(id, message_id, help, markdown)
        }

        // Penetrate Only (admin)
        if(/^!ping/gis.test(text)) {
            if(user_id == adminID) {
                sendMessage(id, message_id, "I'm ready for your command sir")
            } else {
                var sheetName = 'private';
                var shtcfg    = SpreadsheetApp.openById(cfgssID).getSheetByName(sheetName)
                sendMessage(id, message_id, "You don't have permission for access this command.!! Make sure your ID is registered as admin")
            }
        }
        
        //  id checker
        if(/^!id/gis.test(text)) {
          var idGrupreq   = 'Ypur ID : '+user_id+'\n'
              idGrupreq  += 'Your Group ID : '+id+''
          var sheetName   = 'private';
          var shtcfg      = SpreadsheetApp.openById(cfgssID).getSheetByName(sheetName)
          shtcfg.appendRow([t,id, groupname, user_id, name, username, message_id, text]);
          sendMessage(id, message_id, idGrupreq)
        }

        // New Member Event
        if(newMember) {
          var sheetName = 'users';
          var shtcfg = SpreadsheetApp.openById(cfgssID).getSheetByName(sheetName)
          // var new_member = 'Halo '+name+'.  👋🏻 \n\nSilahkan ketik !help untuk melihat format laporan yang baru.'
          shtcfg.appendRow([t, groupname, user_id, name, username]);
          // sendMessage(id, message_id, new_member)
        }

    /* ======== start of Private chat ======== */

    } else if (type == 'private') 
    {
        if(/\/start/gis.test(text)) {
            var start = 'Halo, '+name+' 👋🏻! \n\n Selamat datang di IOCW-Sumut Care. \n Berikut perintah yang tersedia untuk fitur Private chat \n\n'
                start += '======================================================='
                start += '/start => untuk memulai bot dan memunculkan wizard ini \n\n'
                start += '!id => untuk melihat ID telegram kamu\n\n'
                start += '!admin => untuk melihat admin grup \n\n'
                start += '!request => untuk request masuk ke grup dengan menggunakan format : `!request Moban masukkan ke grup dengan username @usernamekamu`. \nPastikan akun kamu tidak diprivate agar bisa dimasukkan ke grup\n\n'
                start += '!about => untuk menampilkan info bot dan aplikasi\n'
                start += '=======================================================\n'
                start += '\n Nantikan Fitur-fitur lainnya di update berikut nya'
                start += '\n Terima kasih telah menggunakan layanan kami'
                start += '\n\nSalam, \n ~IOCW-Sumut Dev~'
            var sheetName = 'private';
            var shtcfg = SpreadsheetApp.openById(cfgssID).getSheetByName(sheetName) ? SpreadsheetApp.openById(cfgssID).getSheetByName (sheetName) : SpreadsheetApp.openById(cfgssID).insertSheet(sheetName)
            shtcfg.appendRow([t,id, groupname, user_id, name, username, message_id, text]);
            sendMessage(id, message_id, start)
        }

        if(/^!id/gis.test(text)) {
            var cek_id = 'ID kamu : '+user_id+' \n'
            var sheetName = 'private';
            var shtcfg = SpreadsheetApp.openById(cfgssID).getSheetByName(sheetName) ? SpreadsheetApp.openById(cfgssID).getSheetByName (sheetName) : SpreadsheetApp.openById(cfgssID).insertSheet(sheetName)
            shtcfg.appendRow([t,id, groupname, user_id, name, username, message_id, text]);
            sendMessage(id, message_id, cek_id)
        }

        if(/^!admin/gis.test(text)) {
            var admin = 'Jajaran Admin : \n============\n'
                admin += 'Jhon Doe   => 👦🏻 \n'
                admin += 'Vrisca  => 👩🏻'
            var sheetName = 'private';
            var shtcfg = SpreadsheetApp.openById(cfgssID).getSheetByName(sheetName) ? SpreadsheetApp.openById(cfgssID).getSheetByName (sheetName) : SpreadsheetApp.openById(cfgssID).insertSheet(sheetName)
            shtcfg.appendRow([t,id, groupname, user_id, name, username, message_id, text]);
            sendMessage(id, message_id, admin)
        }

        if(/^!request/gis.test(text)){
            var request = 'Permintaan kamu sedang diteruskan ke admin grup. \nMohon menunggu respon mereka.'
            var adminre = 'Permintaan request masuk grup dengan username'
            var sheetName = 'private';
            var shtcfg = SpreadsheetApp.openById(cfgssID).getSheetByName(sheetName) ? SpreadsheetApp.openById(cfgssID).getSheetByName (sheetName) : SpreadsheetApp.openById(cfgssID).insertSheet(sheetName)
            shtcfg.appendRow([t,id, groupname, user_id, name, username, message_id, text]);
            sendMessage(id, message_id, request)
            sendMessage(adminID, adminre, JSON.stringify(e.postData.contents = {text})) 
        }

        if(/^!about/gis.test(text)) {
            var about = '======================================\n'
                about += '== Nama bot : **           ==\n'
                about += '== Version : 2.2.0                                                   ==\n'
                about += '== Developer = Zanie                                           ==\n'
                about += '== Last Update : 25/05/2021                             ==\n'
                about += '======================================'
            var sheetName = 'private';
            var shtcfg = SpreadsheetApp.openById(cfgssID).getSheetByName(sheetName) ? SpreadsheetApp.openById(cfgssID).getSheetByName (sheetName) : SpreadsheetApp.openById(cfgssID).insertSheet(sheetName)
            shtcfg.appendRow([t,id, groupname, user_id, name, username, message_id, text]);
            sendMessage(id, message_id, about)
        }
    } else {
      if(/lapor/gis.test(text)) {
      var sheetName = 'private';
      var shtcfg = SpreadsheetApp.openById(cfgssID).getSheetByName(sheetName) ? SpreadsheetApp.openById(cfgssID).getSheetByName (sheetName) : SpreadsheetApp.openById(cfgssID).insertSheet(sheetName)
      shtcfg.appendRow([t,id, groupname, user_id, name, username, message_id, text]);
      sendMessage(id, message_id, "Maaf grup kamu tidak terdaftar. Silahkan japri bot menggunakan perintah !request untuk memasukkan kamu ke grup utama")
    }
      
      //  End of Private chat
      
//       Start of Group
      
      if(/moban/gis.test(text)) {
      var sheetName = 'private';
      var shtcfg = SpreadsheetApp.openById(cfgssID).getSheetByName(sheetName) ? SpreadsheetApp.openById(cfgssID).getSheetByName (sheetName) : SpreadsheetApp.openById(cfgssID).insertSheet(sheetName)
      shtcfg.appendRow([t,id, groupname, user_id, name, username, message_id, text]);
      sendMessage(id, message_id, "Maaf grup kamu tidak terdaftar. Silahkan japri bot menggunakan perintah !request untuk memasukkan kamu ke grup utama")
    }
      
            try {
            if(/^#moban #noss/gis.test(text)) {
            var sheetName = 'private';
            var shtcfg    = SpreadsheetApp.openById(cfgssID).getSheetByName(sheetName)
            sheet.appendRow([t,id, groupname, user_id, name, username, message_id, text]);
            sendMessage(id, message_id, "Maaf grup kamu tidak terdaftar. Silahkan japri bot menggunakan perintah !request untuk memasukkan kamu ke grup utama");
            }
        } catch(err) {
            sendMessage(id, message_id, "Maaf grup kamu tidak terdaftar. Silahkan japri bot menggunakan perintah !request untuk memasukkan kamu ke grup utama")
        }

      //  id checker
      if(/^!id/gis.test(text)) {
        var idGrupreq   = 'ID Anda : '+user_id+'\n'
            idGrupreq  += 'ID grup Anda : '+id+''
        var sheetName   = 'private';
        var shtcfg      = SpreadsheetApp.openById(cfgssID).getSheetByName(sheetName)
        shtcfg.appendRow([t,id, groupname, user_id, name, username, message_id, text]);
        sendMessage(id, message_id, idGrupreq)
    }
  }
}

// End of Group

