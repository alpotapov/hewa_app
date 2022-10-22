import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';

import Logo from './assets/Logo.png';
// import MenuIcon from './assets/Menu.png';
import Back from './assets/buttonBack.png';

// eslint-disable-next-line react/prop-types
// function MenuButton({ setMenuModalOpen }) {
//   return (
//     <View className="flex flex-col justify-center">
//       <TouchableOpacity onPress={() => setMenuModalOpen(true)}>
//         <Image className="w-6 h-6" source={MenuIcon} />
//       </TouchableOpacity>
//     </View>
//   );
// }

// eslint-disable-next-line react/prop-types
function BackButton({ navigate, backLink }) {
  return (
    <View className="flex">
      <TouchableOpacity onPress={() => navigate(backLink)}>
        <Image source={Back} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 130,
    height: 28,
  },
});

function PageBase({ children, backLink, footer }) {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [menuModalOpen, setMenuModalOpen] = React.useState(false);

  return (
    <View className="flex min-h-full flex-col">
      <View className="mt-2">
        {backLink ? (
          <View className="w-full flex flex-row justify-between px-6">
            <BackButton navigate={navigate} backLink={backLink} />
            {/* <MenuButton setMenuModalOpen={setMenuModalOpen} /> */}
          </View>
        ) : (
          <View className="w-full flex flex-row justify-end px-6">
            {/* <MenuButton setMenuModalOpen={setMenuModalOpen} /> */}
          </View>
        )}
      </View>

      <View className="flex-grow flex flex-1 flex-col">{children}</View>

      {footer ? (
        <View className="justify-between items-center mb-8">
          <Image style={styles.logo} source={Logo} />
        </View>
      ) : null}
    </View>
  );
}

PageBase.propTypes = {
  children: PropTypes.node.isRequired,
  backLink: PropTypes.string,
  footer: PropTypes.bool,
};

PageBase.defaultProps = {
  backLink: undefined,
  footer: false,
};

export default PageBase;
