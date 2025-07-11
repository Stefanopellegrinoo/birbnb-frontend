import { useState } from "react";
import {
    Tabs,
    FloatingIndicator,
    Card,
    Group,
    Text,
    ActionIcon,
    ScrollArea,
} from "@mantine/core";
import { IconBell, IconCheck } from "@tabler/icons-react";
import classes from "../../styles/Demo.module.css";

const NotificacionesTabs = ({ sinLeer, leidas, onMarkRead }) => {
    const [rootRef, setRootRef] = useState(null);
    const [value, setValue] = useState("1");
    const [controlsRefs, setControlsRefs] = useState({});

    const setControlRef = (val) => (node) => {
        if (node && controlsRefs[val] !== node) {
            setControlsRefs((prev) => ({ ...prev, [val]: node }));
        }
    };

    const renderList = (list) => {
        if (list.length === 0) {
            return (
                <Text size="sm" color="dimmed">
                    {value === "1"
                        ? "No tienes notificaciones nuevas"
                        : "No tienes notificaciones leídas"}
                </Text>
            );
        }

        return (
            <ScrollArea style={{ height: 200 }}>
                {list.map((n) => (
                    <Card
                        key={n._id}
                        p="sm"
                        mb="sm"
                        radius="sm"
                        shadow="xs"
                        withBorder
                    >
                        <Group position="apart">
                            <Group spacing="sm">
                                <IconBell size={18} />
                                <Text size="sm">{n.mensaje}</Text>
                            </Group>
                            {value === "1" && (
                                <ActionIcon
                                    color="blue"
                                    variant="light"
                                    size="sm"
                                    onClick={() => onMarkRead(n)}
                                    title="Marcar como leído"
                                >
                                    <IconCheck size={16} />
                                </ActionIcon>
                            )}
                        </Group>
                    </Card>
                ))}
            </ScrollArea>
        );
    };

    return (
        <Tabs
            variant="none"
            value={value}
            onChange={setValue}
            style={{ width: 300 }}
        >
            <Tabs.List
                ref={setRootRef}
                className={classes.list}
                style={{
                    display: "flex",
                    position: "relative",
                    borderBottom: "1px solid #eee",
                }}
            >
                <Tabs.Tab
                    value="1"
                    ref={setControlRef("1")}
                    className={classes.tab}
                    style={{ flex: 1, textAlign: "center", padding: "8px" }}
                >
                    Sin Leer
                </Tabs.Tab>
                <Tabs.Tab
                    value="2"
                    ref={setControlRef("2")}
                    className={classes.tab}
                    style={{ flex: 1, textAlign: "center", padding: "8px" }}
                >
                    Leídas
                </Tabs.Tab>

                <FloatingIndicator
                    target={value ? controlsRefs[value] : null}
                    parent={rootRef}
                    className={classes.indicator}
                    style={{
                        bottom: 0,
                        height: 2,
                        backgroundColor: "#228be6",
                        transition: "transform 150ms ease, width 150ms ease",
                    }}
                />
            </Tabs.List>

            <Tabs.Panel value="1">{renderList(sinLeer)}</Tabs.Panel>
            <Tabs.Panel value="2">{renderList(leidas)}</Tabs.Panel>
        </Tabs>
    );
};

export default NotificacionesTabs;
