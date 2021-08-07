import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

export function FriendChip(props) {

return <Chip color="primary" label={props.name} avatar={<Avatar src={props.url} />} />

}