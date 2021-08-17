import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  isCurrency?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrency = false,
  number,
  onPageChange
}: PaginationItemProps) {
  if (isCurrency) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bgColor: "pink.500",
          cursor: "default",
        }}
      >
        {number}
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bgColor="gray.700"
      _hover={{
        bgColor: "gray.500"
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )
}