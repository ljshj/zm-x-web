import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { Text } from 'preact-i18n';
import { callWith } from '../../lib/util';

import { Icon } from '@zimbra/blocks';
import ModalDialog from '../modal-dialog';

import s from './style.less';

export default class BlockDialog extends Component {
	static propTypes = {
		onConfirm: PropTypes.func.isRequired,
		onClose: PropTypes.func.isRequired,
		pending: PropTypes.bool
	};

	static defaultProps = {
		pending: false
	};

	state = {
		confirmedEmails: [],
		blockAll: true,
		deleteAll: true
	};

	toggleBlockAll = () => {
		this.setState({ blockAll: !this.state.blockAll });
	}

	toggleDeleteAll = () => {
		this.setState({ deleteAll: !this.state.deleteAll });
	}

	removeEmail = (email) => {
		this.setState({
			confirmedEmails: this.state.confirmedEmails.filter(e => e !== email)
		});
	}

	handleConfirm = () => {
		const { confirmedEmails: emails, blockAll, deleteAll } = this.state;

		this.props.onConfirm({
			emails,
			blockAll,
			deleteAll
		});
	}

	componentWillMount() {
		this.setState({ confirmedEmails: this.props.emails });
	}

	render() {
		const { pending, onClose } = this.props;
		const { confirmedEmails, blockAll, deleteAll } = this.state;

		return (
			<ModalDialog
				disablePrimary={confirmedEmails.length === 0}
				pending={pending}
				title="dialogs.blockEmails.DIALOG_TITLE"
				actionLabel="buttons.ok"
				onAction={this.handleConfirm}
				onClose={onClose}
			>
				<form disabled={pending}>
					<p class={s.description}>
						<Text id="dialogs.blockEmails.DESCRIPTION" />
					</p>

					<div class={s.emails}>
						{confirmedEmails.map(email => (
							<div class={s.emailRow}>
								<div class={s.email}>
									<span>{email}</span>
									<button
										class={s.removeEmail}
										onClick={callWith(this.removeEmail, email)}
									>
										<Icon name="times" size="sm" />
									</button>
								</div>
							</div>
						))}
					</div>

					<div class={s.checkboxFieldGroup}>
						<input
							type="checkbox"
							checked={blockAll}
							onClick={this.toggleBlockAll}
						/>
						<label><Text id="dialogs.blockEmails.BLOCK_EMAILS_LABEL" /></label>
					</div>

					<div class={s.checkboxFieldGroup}>
						<input
							type="checkbox"
							checked={deleteAll}
							onClick={this.toggleDeleteAll}
						/>
						<label><Text id="dialogs.blockEmails.DELETE_EMAILS_LABEL" /></label>
					</div>
				</form>
			</ModalDialog>
		);
	}
}
