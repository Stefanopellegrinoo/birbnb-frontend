import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';


const ErrorAlert = ({message, title,onChange}) => {
const icon = <IconInfoCircle />;
  return (
    <Alert onClose={()=>onChange(false)} withCloseButton variant="light" color="rgba(255, 0, 0, 1)" radius="md" title={title} icon={icon} >
    {message}
    </Alert>
  );
}

export default ErrorAlert