import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncryptdecryptService {
  private key=CryptoJS.enc.Utf8.parse('dfddtftfkffttkftkdddfddt')
  private iv=CryptoJS.enc.Utf8.parse('dfddtftfkffttkfh')
    constructor() { }
    encryptUsingAES256(text: any):any{
      var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), this.key, {
         keySize: 128 ,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
    }
    decryptUsingAES256(decString: string | CryptoJS.lib.CipherParams) {
      var decrypted = CryptoJS.AES.decrypt(decString, this.key, {
          keySize: 128,
          iv: this.iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });
      debugger;
      return decrypted.toString(CryptoJS.enc.Utf8);
  }
  
}
