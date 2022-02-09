import React, { FC, useState, useContext, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';

interface ShowToasterProps {
  text?: string;
  isError?: boolean;
  duration?: number;
}

interface ToasterProps {
  showToaster: (args: ShowToasterProps) => void;
}

const ToasterContext = React.createContext<ToasterProps>({
  showToaster: () => {},
});

const ToasterProvider: FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);

  const showToaster = useCallback(({ text, isError, duration }: ShowToasterProps) => {
    setOpen(true);
    setDuration(duration || 3000);
    setError(isError || false);
    setText(text || '');
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const state = {
    showToaster,
  };

  return (
    <ToasterContext.Provider value={state}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        message={text}
        ContentProps={{
          style: {
            backgroundColor: error ? '#D92121' : '',
          },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </ToasterContext.Provider>
  );
};

export const useToaster = () => useContext(ToasterContext);
export default ToasterProvider;
