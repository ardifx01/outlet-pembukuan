import {ReactNode} from 'react';
import {Text} from 'react-native';

const NotFound = ({children}: {children: ReactNode}) => {
  return (
    <Text
      className="text-center mt-10 font-sourceSansProSemiBold text-primary
 ">
      {children}
    </Text>
  );
};

export default NotFound;
