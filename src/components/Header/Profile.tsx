import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Robson Fischer</Text>
          <Text color="gray.300" fontSize="small">
            fischerrobson@gmail.com
          </Text>
        </Box>
      )}
      <Avatar size="md" name="Robson Fischer" src="https://github.com/FischerRobson.png" />
    </Flex>
  )
}