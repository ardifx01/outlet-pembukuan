import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import responseHandler from '../../lib/responseHandler';
import {ErrorHandler} from '../../lib/Error';
import {httpd} from '../../lib/axios';
import AnnouncementModal from './AnnouncementModal';
import {err} from 'react-native-svg';

export type AnnouncementMsg = {
  message: string;
  closed: boolean;
} & ({link: string; action: string} | {link?: never; action?: never});

type fetchedAnnouncement = {show: boolean} & AnnouncementMsg;
const Announcement = () => {
  const [show, setShow] = useState(false);
  const [announcement, setAnnouncement] = useState<AnnouncementMsg | null>(
    null,
  );
  const fetchAnnouncements = useCallback(async () => {
    try {
      const res = await httpd.get('/announcement');
      responseHandler(
        res,
        ({announcement: data}: {announcement: fetchedAnnouncement}) => {
          setShow(data.show);
          setAnnouncement(data);
        },
      );
    } catch (e: any) {
      if (e.response?.status === 426) {
        const link = e.response.data.error.link;
        setShow(true);
        if (link)
          setAnnouncement({
            link,
            action: 'DOWNLOAD',
            message: e.response.data.error.message,
            closed: false,
          });
        else {
          setAnnouncement({
            message: e.response.data.error.message,
            closed: false,
          });
        }
      } else {
        ErrorHandler(e);
      }
    }
  }, []);
  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);
  if (announcement) {
    return <AnnouncementModal show={show} {...announcement} />;
  }
  return null;
};

export default Announcement;
