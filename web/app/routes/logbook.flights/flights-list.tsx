import { client } from "@/util/api";
import { Flight } from "@/util/types";
import { NavLink, Text, Button, ScrollArea, Stack } from "@mantine/core";
import { Link, useLocation } from "@remix-run/react";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

export function FlightsList() {
  const flights = useQuery({
    queryKey: ["flights-list"],
    queryFn: () => client.get(`/flights`).then((res) => res.data),
  });

  const location = useLocation();
  const page = location.pathname.split("/")[3];

  return (
    <Stack p="0" m="0" gap="0">
      <Button variant="outline" leftSection={<IconPlus />} mb="md">
        Add
      </Button>
      <ScrollArea>
        {flights.data ? (
          flights.data.map((flight: Flight, index: number) => (
            <NavLink
              key={index}
              component={Link}
              to={`/logbook/flights/${flight.id}`}
              label={`${flight.date}`}
              active={page === flight.id}
            />
          ))
        ) : (
          <Text p="sm">No Flights</Text>
        )}
      </ScrollArea>
    </Stack>
  );
}

export function MobileFlightsList() {
  const flights = useQuery({
    queryKey: ["flights-list"],
    queryFn: () => client.get(`/flights`).then((res) => res.data),
  });

  const location = useLocation();
  const page = location.pathname.split("/")[3];

  return (
    <Stack p="0" m="0" justify="space-between" h="calc(100vh - 95px)">
      <ScrollArea h="calc(100vh - 95px - 50px">
        {flights.data ? (
          flights.data.map((flight: Flight, index: number) => (
            <NavLink
              key={index}
              component={Link}
              to={`/logbook/flights/${flight.id}`}
              label={`${flight.date}`}
              active={page === flight.id}
            />
          ))
        ) : (
          <Text p="sm">No Flights</Text>
        )}
      </ScrollArea>
      <Button variant="outline" leftSection={<IconPlus />} mt="md">
        Add
      </Button>
    </Stack>
  );
}

export default { FlightsList, MobileFlightsList };
