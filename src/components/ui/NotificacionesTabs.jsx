import { useState } from 'react';
import {
  Tabs,
  FloatingIndicator,
  Card,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
} from '@mantine/core';
import { IconBell, IconCheck } from '@tabler/icons-react';
import classes from '../../styles/Demo.module.css';

const NotificacionesTabs = ({sinLeer, leidas}) => {
   const [rootRef, setRootRef] = useState(null);
  const [value, setValue] = useState('1');
  const [controlsRefs, setControlsRefs] = useState({});
  const setControlRef = (val) => (node) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

   const renderList = (list) => {
    if (list.length === 0) {
      return (
        <Text size="sm" color="dimmed">
          {value === '1'
            ? 'No tienes notificaciones nuevas'
            : 'No tienes notificaciones leídas'}
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
              <ActionIcon
                color="blue"
                variant="light"
                size="sm"
                onClick={() => onMarkRead(n._id)}
                title="Marcar como leído"
              >
                <IconCheck size={16} />
              </ActionIcon>
            </Group>
          </Card>
        ))}
      </ScrollArea>
    );
  };

  return (
    <Tabs variant="none" value={value} onChange={setValue} style={{ width: 300 }}>
      <Tabs.List 
       style={{
          display: 'flex',
          position: 'relative',
          borderBottom: '1px solid #eee',
        }}
      ref={setRootRef} className={classes.list}>
        <Tabs.Tab 
                  style={{ flex: 1, textAlign: 'center', padding: '8px' }}

        value="1" ref={setControlRef('1')} className={classes.tab}>
         Sin Leer
        </Tabs.Tab>
        <Tabs.Tab 
                  style={{ flex: 1, textAlign: 'center', padding: '8px' }}

        value="2" ref={setControlRef('2')} className={classes.tab}>
          Leidas
        </Tabs.Tab>

        <FloatingIndicator
          target={value ? controlsRefs[value] : null}
          parent={rootRef}
          className={classes.indicator}
           style={{
            bottom: 0,
            height: 2,
            backgroundColor: '#228be6',
            transition: 'transform 150ms ease, width 150ms ease',
          }}
        />
      </Tabs.List>

      <Tabs.Panel value="1">
      {renderList(sinLeer)}
        
        </Tabs.Panel>
      <Tabs.Panel value="2">
         {renderList(leidas)}
      </Tabs.Panel>
    </Tabs>
  );
}

export default NotificacionesTabs