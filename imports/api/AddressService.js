/**
 * Created by Danpan on 09.05.16.
 */
/**
 * https://confluence.hflabs.ru/pages/viewpage.action?pageId=382173300
 */
export class AddressService {

  constructor() {

  }

  static search(data) {
    // console.log('request', data);
    console.log($);
    return $.ajax({
      url: 'https://dadata.ru/api/v2/suggest/address',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        'Authorization': 'Token 36ce4e48c96546b16258aeee6b779515f98cfa92',
        'X-Version': '15.10.3'
      },
      data: JSON.stringify(data)
    });
  }

}