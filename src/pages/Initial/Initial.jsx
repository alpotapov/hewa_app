import React from 'react';
import { Navigate } from "react-router-native";
import appFlowDomain from "../../domain/appFlow";

const Initial = () => {

  const [redirectComponent, setRedirectComponent] = React.useState(null);

  React.useEffect(() => {
    appFlowDomain.shouldGoToFirstFlow().then((result) => {
      if (result) {
        setRedirectComponent(<Navigate to='/first-flow' />);
        return;
      }

      setRedirectComponent(<Navigate to='/dashboard' />);
    })
  }, []);



  return redirectComponent;
}

export default Initial;