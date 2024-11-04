import AuthStackNavigate from './AuthStackNavigate';
import StackNavigate from './StackNavigate';

const RootNavigate = () => {
  const isLoggin = true;

  return <>{isLoggin ? <StackNavigate /> : <AuthStackNavigate />}</>;
};

export default RootNavigate;
