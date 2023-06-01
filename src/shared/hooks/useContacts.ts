import { useRetrieve } from './useRetrieve';
import { KeychainKeys } from '../constants';
import { Contact } from '../types/Contact';
import { retrieveStoredItem, storeItem } from '../services/keychain';

export const useContacts = () => {
  return useRetrieve(KeychainKeys.contacts);
};

export const addContact = async (contact: Contact) => {
  const contacts = (await retrieveStoredItem(KeychainKeys.contacts)) || '[]';
  const parsedContacts = JSON.parse(contacts);
  const updatedContacts = [...parsedContacts, contact];
  const stringifiedContacts = JSON.stringify(updatedContacts);
  await storeItem({ key: KeychainKeys.contacts, value: stringifiedContacts });
};
// Just for testing purposes
// TODO: Delete after adding contacts is possible in the app
export const seedContacts = async () => {
  const contacts = [
    {
      username: 'John Doe',
      address: '0x1234567890',
      profilePicture:
        'https://hips.hearstapps.com/hmg-prod/images/screen-shot-2023-04-05-at-10-45-00-am-642d908a43933.png?crop=0.6239583333333333xw:1xh;center,top&resize=1200:*',
    },
    {
      username: 'Jack Doe',
      address: '0x1234567891',
      profilePicture:
        'https://movie-fanatic-res.cloudinary.com/iu/s--5lvfCiun--/t_full/cs_srgb,f_auto,fl_strip_profile.lossy,q_auto:420/v1364991145/jack-black-photograph.jpg',
    },
    {
      username: 'John Black',
      address: '0x1234567892',
      profilePicture:
        'https://www.cheatsheet.com/wp-content/uploads/2020/04/jack-black.png',
    },
    {
      username: 'Jack Black',
      address: '0x1234567893',
      profilePicture:
        'https://www.filmfestivals.com/files/images/u9187/JackBlackShavesCovidHair2020.png',
    },
    {
      username: 'Jack White',
      address: '0x1234567894',
      profilePicture:
        'https://www.wearethepit.com/wp-content/uploads/2022/06/Untitled-design-1-31-678x381.png',
    },
    {
      username: 'Barry White',
      address: '0x1234567895',
      profilePicture:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/efefd3c0-ee96-4340-968b-976399cdcb14/ddhad4h-b09a92a9-9c14-4e1e-a328-cc4b15ca5c5f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VmZWZkM2MwLWVlOTYtNDM0MC05NjhiLTk3NjM5OWNkY2IxNFwvZGRoYWQ0aC1iMDlhOTJhOS05YzE0LTRlMWUtYTMyOC1jYzRiMTVjYTVjNWYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.CqI4_LVVJ-st69w31rcqtEwcL_Nne_bD_Z4qA5S_6RI',
    },
    {
      username: 'Barry Lyndon',
      address: '0x1234567896',
      profilePicture:
        'https://www.pngkit.com/png/full/785-7857160_download-jack-black-hollywood-walk-of-fame.png',
    },
    {
      username: 'Harry Lyndon',
      address: '0x1234567897',
      profilePicture:
        'https://i0.wp.com/www.celebrity-cutouts.com/wp-content/uploads/2020/02/jack-black-beard-celebrity-mask.png?fit=1200%2C600&ssl=1',
    },
    {
      username: 'Harry Potter',
      address: '0x1234567898',
      profilePicture:
        'https://i0.wp.com/www.celebrity-cutouts.com/wp-content/uploads/2018/05/jack-black-celebrity-mask.png',
    },
    {
      username: 'James Potter',
      address: '0x1234567899',
      profilePicture:
        'https://www.vhv.rs/dpng/d/44-440385_jack-black-hd-png-download.png',
    },
  ];
  const stringifiedContacts = JSON.stringify(contacts);
  await storeItem({ key: KeychainKeys.contacts, value: stringifiedContacts });
};
