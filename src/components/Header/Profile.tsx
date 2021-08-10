import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Robson Fischer</Text>
        <Text color="gray.300" fontSize="small">
          fischerrobson@gmail.com
        </Text>
      </Box>
      <Avatar size="md" name="Robson Fischer" src="https://github.com/FischerRobson.png" />
    </Flex>
  )
}