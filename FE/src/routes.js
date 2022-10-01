import React, {useEffect} from 'react';
import Loginpage from './component/Basics/Loginpage';
import Mainpage from './component/Basics/Mainpage';

const Routes = () => {

    const [res, setRes] = React.useState('');
    const [page, setPage] = React.useState(<Loginpage setRes = { setRes } />);
    useEffect(() => {
      if(res === 200) {
        setPage(<Mainpage />);
      }
    }, [res]);

  return (
    <>
        {page}
    </>
  )
}

export default Routes;