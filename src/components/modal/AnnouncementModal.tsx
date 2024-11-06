import ReactNativeModal from 'react-native-modal';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {AnnouncementMsg} from './Announcement';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';

const AnnouncementModal = ({
  show,
  ...announcement
}: {
  show: boolean;
} & AnnouncementMsg) => {
  const [showModal, setShowModal] = useState<boolean>(show);
  return (
    <ReactNativeModal isVisible={showModal} className="items-center">
      <View className="w-[95%] bg-white px-6 py-4 rounded-lg">
        <View>
          <Text className="text-xl text-primary font-sourceSansProSemiBold">
            Pengumuman
          </Text>
        </View>
        <View className="my-2">
          <Text
            className="font-sourceSansPro text-lg text-interaction"
            style={{lineHeight: 19}}>
            {announcement?.message}
          </Text>
        </View>
        <View className="flex-row justify-end mt-2 gap-x-6">
          {announcement?.action && (
            <TouchableOpacity
              onPress={() => Linking.openURL(announcement.link)}
              className="">
              <Text className="text-success font-sourceSansProSemiBold text-base">
                {announcement.action}
              </Text>
            </TouchableOpacity>
          )}
          {announcement?.closed && (
            <TouchableOpacity onPress={() => setShowModal(false)} className="">
              <Text className="text-interaction text-base font-sourceSansProSemiBold">
                OK
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default AnnouncementModal;
