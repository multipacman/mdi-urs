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
import { clearAuthInfo, userLogout } from '../../slices/auth';
import { clearUserInfo } from '../../slices/user';
import { getUserDetails } from '../../slices/user';
import { useEffect } from 'react';

export default function Navbar(props) {
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  let children = { ...props.children };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!auth.access_token) {
      dispatch(getUserDetails(auth.access_token));
    }
  }, [auth, dispatch]);

  return (
    <>
      <Box hidden={!user.accountInfo} bg={'gray.300'} h={'70px'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box
            textTransform={'uppercase'}
            as={'b'}
            onClick={() => navigate('/profile')}
            cursor={'default'}
            textColor={'blue.700'}
          >
            ABC Company
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={5}>
              <Text as={'b'}>
                {user.accountInfo?.patient?.gender === null ||
                user.accountInfo?.patient?.gender === 'other'
                  ? null
                  : user.accountInfo?.patient?.gender === 'male'
                  ? 'Mr '
                  : 'Mrs '}
                {user?.accountInfo?.patient?.name}
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
                    src={user.accountInfo?.patient?.profile_image?.thumb}
                  />
                </MenuButton>
                <MenuList
                  mt={5}
                  bg={'gray.300'}
                  alignItems={'center'}
                  borderRadius={'lg'}
                >
                  <MenuItem
                    bg={'gray.300'}
                    fontSize={'sm'}
                    fontWeight={'semibold'}
                    onClick={() => navigate('/profile')}
                    _hover={{
                      color: 'blue.700',
                    }}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuDivider mx={2} />
                  <MenuItem
                    bg={'gray.300'}
                    fontSize={'sm'}
                    fontWeight={'semibold'}
                    onClick={() => navigate('/profile-edit')}
                    _hover={{
                      color: 'blue.700',
                    }}
                  >
                    Edit Profile
                  </MenuItem>
                  <MenuDivider mx={2} />
                  <MenuItem
                    bg={'gray.300'}
                    fontSize={'sm'}
                    fontWeight={'semibold'}
                    onClick={() => {
                      dispatch(clearAuthInfo());
                      dispatch(clearUserInfo());
                      dispatch(userLogout(auth.access_token));
                      navigate('/');
                    }}
                    _hover={{
                      color: 'blue.700',
                    }}
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
