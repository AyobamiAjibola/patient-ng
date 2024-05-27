import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material';

function Search() {
  const theme = useTheme();

  return (
    <Input.Group compact 
      style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      
      <Input
        style={{ width: '80%', paddingLeft: '40px' }}
        placeholder="Search campaigns"
        size="large"
      />
      <SearchOutlined 
        style={{
          fontSize: '20px', 
          color: theme.palette.secondary.light,
          position: 'absolute',
          marginLeft: '10px'
        }}
    />
      {/* <Button
        type="primary"
        style={{ 
            backgroundColor: theme.palette.primary.main, 
            color: 'white', position: 'absolute',
            alignSelf: 'flex-end'
        }}
      >
        Search
      </Button> */}
    </Input.Group>
  );
}

export default Search;
