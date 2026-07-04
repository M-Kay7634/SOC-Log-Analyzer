import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  const bg = useColorModeValue(
    "white",
    "gray.800"
  );

  return (
    <InputGroup maxW="400px">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.400" />
      </InputLeftElement>

      <Input
        bg={bg}
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </InputGroup>
  );
}

export default SearchBar;