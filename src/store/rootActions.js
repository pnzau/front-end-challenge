import shared from 'modules/shared/store';
import repos from 'modules/repositories/store';

export default {
    ...shared.actions,
    ...repos.actions,
}