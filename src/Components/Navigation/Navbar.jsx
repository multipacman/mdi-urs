import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  const user = useSelector(state => state.user);
  let children = { ...props.children };

  const navigate = useNavigate();

  return (
    <>
      <Box hidden={!user.accountInfo} bg={'gray.300'} h={'70px'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box textTransform={'uppercase'} as={'b'}>
            ABC Company
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Text as={'b'}>
                {user.accountInfo?.patient?.gender === null
                  ? null
                  : user.accountInfo?.patient?.gender === 'male'
                  ? 'Mr '
                  : 'Mrs '}
                {user?.accountInfo?.name}
              </Text>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList
                  bg={'gray.300'}
                  alignItems={'center'}
                  borderRadius={'lg'}
                >
                  <MenuItem
                    bg={'gray.300'}
                    fontSize={'md'}
                    onClick={() => navigate('/profile-edit')}
                  >
                    Edit Profile
                  </MenuItem>
                  <MenuDivider mx={2} />
                  <MenuItem
                    bg={'gray.300'}
                    fontSize={'md'}
                    onClick={() => navigate('/profile')}
                  >
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Box>{children}</Box>
    </>
  );
}
