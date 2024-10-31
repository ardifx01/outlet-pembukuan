import ReactNativeModal from 'react-native-modal';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import responseHandler from '../../lib/responseHandler';
import {ErrorHandler} from '../../lib/Error';

type AnnouncementMsg = {
  message: string;
  closed: boolean;
} & ({link: string; action: string} | {link?: never; action?: never});

type fetchedAnnouncement = {show: boolean} & AnnouncementMsg;
const Announcement = ({closed}: {closed?: boolean}) => {
  const [show, setShow] = useState(false);
  const [announcement, setAnnouncement] = useState<AnnouncementMsg | null>(
    null,
  );
  const fetchAnnouncements = useCallback(async () => {
    try {
      const res = await axios.get(process.env['DEV_URL'] + '/announcement');
      responseHandler(
        res,
        ({announcement: data}: {announcement: fetchedAnnouncement}) => {
          if (closed == false && !data.closed) {
            setShow(data.show);
          } else if (closed == undefined) {
            setShow(data.show);
          } else {
            setShow(false);
          }
          setShow(data.show);
          setAnnouncement(data);
        },
      );
    } catch (e) {
      ErrorHandler(e);
    }
  }, []);
  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);
  return (
    <ReactNativeModal isVisible={show} className="items-center">
      <View className="w-[95%] bg-white px-6 py-4 rounded-lg">
        <View>
          <Text className="text-xl text-primary font-sourceSansProSemiBold">
            Pengumuman
          </Text>
        </View>
        <View className="my-4">
          <Text
            className="font-sourceSansPro text-base text-interaction"
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
            <TouchableOpacity onPress={() => setShow(false)} className="">
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

export default Announcement;
