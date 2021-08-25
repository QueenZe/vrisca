/* 
**                    Bot => @IOCWSumut_bot
**                  Last Update : 08/06/2021
**                        Dev By : Zanie 
**    ****************************************************
**    ****************************************************
**    **                  Licensi :                     **
**    **   - Skrip dan segala yang terdapat disini      **
**    **     sepenuhnya milik WOC Sumut Dev             **
**    **                                                **
**    **   - Tidak diizinkan mengubah, menyalin,        **
**    **     menyebarluaskan tanpa izin dari programmer **
**    **                                                **
**    **   - Untuk Request Bot ataupun beli source code **
**    **     dapat menghubungi @FALL0UT                 **
**    ****************************************************
**    ****************************************************
**
**
**
*/


// ===================================================Start of Constanta=====================================================
const token         = "your-bot-token"; // Fill With Your own bot token
const telegramUrl   = "https://api.telegram.org/bot" + token;
const webAppUrl     = "your-webapp-url"; // Fill with your own google app url
const ssId          = "your-spreadsheet"; // Fill with your own spreadsheet ID
const cfgssID       = 'optional' // If you want to make a backup spreadsheet, Fill it with your own backup spreadsheet ID. If you don't, just remove this line
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
  return HtmlService.createHtmlOutput("Hi! Me bot");
}

function doPost(e) {
const data      = JSON.parse(e.postData.contents);
let text        = data.message.text;
let id          = data.message.chat.id;
let name        = data.message.from.first_name
                    if(data.message.from.last_name) {
                        name += ' ' + data.message.from.last_name
                    }
let message_id  = data.message.message_id
let user_id     = data.message.from.id
let username    = data.message.from.username
let groupname   = data.message.chat.title
let type        = data.message.chat.type
let newMember   = data.message.new_chat_member
let markdown    = 'markdown'
let HTML        = 'HTML'
var responNoss  = '💾 Laporan Noss dengan ID '+orderID+' berhasil diteruskan ke HD WOC. Mohon menunggu'
var responOrder = '💾 Laporan Order dengan ID '+orderID+' berhasil diteruskan ke HD WOC. Mohon menunggu'
var responUim   = '💾 Laporan UIM dengan ID '+orderID+' berhasil diteruskan ke HD Daman. Mohon menunggu'
var responLogic = '💾 Laporan Logic dengan ID '+orderID+' berhasil diteruskan ke Logic On Desk. Mohon menunggu'
var responWifi  = '💾 Laporan Wifi dengan ID '+orderID+' berhasil diteruskan ke HD BGES. Mohon menunggu'
var falseFormat = '❌ Format Kamu salah. Ketik !help untuk melihat format yang tersedia'

    if(type == 'supergroup') {
        // START OF #NOSS  
      try {
            if(/^#moban #noss/gis.test(text)) {
            var sheetName = 'NOSS';
            var sheet     = SpreadsheetApp.openById(ssId).getSheetByName(sheetName)
            sheet.appendRow([t,id, groupname, user_id, name, username, message_id, text]);
            sendMessage(id, message_id, responNoss);
            }
        } catch(err) {
            sendMessage(id, message_id, falseFormat)
        }
        // END OF #NOSS


        // START OF #ORDER
        try {
            if(/^#moban #order/gis.test(text)) {
            var sheetName = 'ORDER';
            var sheet     = SpreadsheetApp.openById(ssId).getSheetByName(sheetName)
            sheet.appendRow([t,id, groupname, user_id, name, username, message_id, text]);
            sendMessage(id, message_id, responOrder);
            }
        } catch(err) {
            sendMessage(id, message_id, falseFormat)
        }
        // END OF #ORDER


        // START OF #UIM
        try {
            if(/^#moban #uim/gis.test(text)) {
            var sheetName = 'UIM';
            var sheet     = SpreadsheetApp.openById(ssId).getSheetByName(sheetName)
            sheet.appendRow([t,id, groupname, user_id, name, username, message_id, text]);
            sendMessage(id, message_id, responUim);
            }
        } catch(err) {
            sendMessage(id, message_id, falseFormat)
        }
        // END OF #UIM
        
        
        // START OF #LOGIC
        try {
            if(/^#moban #logic/gis.test(text)) {
            var sheetName = 'LOGIC';
            var sheet     = SpreadsheetApp.openById(ssId).getSheetByName(sheetName)
            sheet.appendRow([t,id, groupname, user_id, name, username, message_id, text]);
            sendMessage(id, message_id, responLogic);
            }
        } catch(err) {
            sendMessage(id, message_id, falseFormat)
        }
        // END OF #LOGIC

        // START OF #WIFI
        try {
            if(/^#moban #wifi/gis.test(text)) {
            var sheetName = 'WIFI';
            var sheet     = SpreadsheetApp.openById(ssId).getSheetByName(sheetName)
            sheet.appendRow([t,id, groupname, user_id, name, username, message_id, text]);
            sendMessage(id, message_id, responWifi);
            }
        } catch(err) {
            sendMessage(id, message_id, falseFormat)
        }
        // END OF #WIFI
        

        if(/^!help/gis.test(text)) {
            var help = '\n==- Format -== \n\n'
                help += '#moban #noss      => Khusus push order OSM (Prov. Start -  Prov. Completed, Fallout Act, Fallout OSM)\n'
                help += '#moban #order     => Khusus push order ke Teknisi (PI)\n'
                help += '#moban #uim       => Khusus push order UIM (Fallout UIM, Update data service)\n'
                help += '#moban #logic     => Khusus push order Logic (Cabut Ponr)\n'
                help += '#moban #wifi      => Khusus push order Wifi\n'
                help += '\n *Order diluar hastag dan status yang ditentukan akan kami kembalikan ke user dan silahkan push ke PIC yang sudah ada*\n'
                help += '\n==- Contoh -==\n'
                help += '\n#moban #noss \nTipe : \nSCID : \nKeterangan :\n'
                help += '\n#moban #order \nTipe : \nSCID : \nKeterangan :\n'
                help += '\n#moban #uim \nTipe : \nSCID/ND : \nKeterangan :\n'
                help += '\n#moban #logic \nSCID/ND : \nKeterangan : \nAlasan :\n'
                help += '\n#moban #wifi \nTipe : \nSCID : \nKeterangan :\n'
            var sheetName = 'private';
            var shtcfg    = SpreadsheetApp.openById(cfgssID).getSheetByName(sheetName)
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
          var idGrupreq   = 'ID Anda : '+user_id+'\n'
              idGrupreq  += 'ID grup Anda : '+id+''
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
                admin += 'Zanie   => 👦🏻 \n'
                admin += 'Ade     => 👨🏻 \n'
                admin += 'Arif    => 👦🏻 \n'
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
                about += '== Nama bot : IOCW-Sumut Care Bot           ==\n'
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

