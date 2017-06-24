import { PrivateRoute } from '../../App';

const SideMenu = ({ component: Component, exact, path }) => {
  return (
    <div>
      <p>side menu</p>

      <PrivateRoute exact path={path} component={Component} />
    </div>
  );
}