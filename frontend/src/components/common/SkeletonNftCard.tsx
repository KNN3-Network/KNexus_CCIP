import React from "react";

import { Skeleton, Stack } from "@chakra-ui/react";

export function SkeletonNftCard() {
  return (
    <Stack w="full" h="full">
      <Skeleton
        h="full"
        borderRadius={8}
        startColor="#F3F3F3"
        endColor="#D9D9D9"
      />
    </Stack>
  );
}
