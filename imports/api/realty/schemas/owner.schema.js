// детальная информация для объекта (аренда)
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {dictionary} from '../../../helpers/dictionary';

export const OwnerSchema = new SimpleSchema({
  
  // Комиссия, которую платит собственник объекта риелтору.
  comission: {
    type: Number, 
    optional: true
  },
  isComission: {
    type: Boolean, 
    optional: true
  },
  isOwner: {
    type: Boolean, 
    optional: true
  },
  deposit: {
    type: Number, 
    optional: true
  }
    
});

