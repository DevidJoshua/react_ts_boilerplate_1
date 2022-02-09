import { useCallback, useState } from 'react';
import { API_HOST } from '@config';
import { useToaster } from '@/context/Toaster';
import fetcher from '@helpers/fetcher';
import { NotificationResponse } from '../interface';

const API = `${API_HOST}user-inboxes/`;

const useUpdateNotification = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const { showToaster } = useToaster();

  const onUpdateNotification = useCallback(
    async (token: string, notifID: number) => {
      setLoading(true);
      await fetcher(`${API}${notifID}`, {
        method: 'PUT',
        token,
        body: JSON.stringify({
          isRead: true,
        }),
      })
        .then((result: NotificationResponse) => {
          setLoading(false);
          if (result.isRead) {
            showToaster({
              text: 'Notifikasi telah dibaca',
              isError: false,
              duration: 1000,
            });
          }
        })
        .catch(error => {
          setLoading(false);
          console.warn(error);
        });
    },
    [showToaster],
  );

  return {
    onUpdateNotification,
    loading,
  };
};

export default useUpdateNotification;
