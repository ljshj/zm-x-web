import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Text, withText } from 'preact-i18n';
import { callWith } from '../../lib/util';

import { SORT_BY } from '../../constants/search';
import { groupMailBy } from '../../constants/user-prefs';

import { toggle as toggleSettings } from '../../store/settings/actions';
import { setGroupMailBy } from '../../store/email/actions';
import { getUserPref } from '../../store/email/selectors';

import ActionMenu, { DropDownWrapper } from '../action-menu';
import ActionMenuGroup from '../action-menu-group';
import ActionMenuItem from '../action-menu-item';

const SortActionMenuItem = ({ sort, sortBy, onSort, children }) => (
	<ActionMenuItem
		icon={sort === sortBy ? 'check' : null}
		onClick={callWith(onSort, sort)}
	>
		{children}
	</ActionMenuItem>
);

@withText({
	dateDescLabel: 'mail.sortLabels.dateDesc',
	dateAscLabel: 'mail.sortLabels.dateAsc',
	attachDescLabel: 'mail.sortLabels.attachDesc',
	flagDescLabel: 'mail.sortLabels.flagDesc',
	nameAscLabel: 'mail.sortLabels.nameAsc',
	subjAscLabel: 'mail.sortLabels.subjAsc',
	unreadLabel: 'mail.sortLabels.unread'
})
@connect(
	state => ({
		groupBy: getUserPref(state, groupMailBy.name)
	}),
	{
		toggleSettings,
		setGroupMailBy
	}
)
export default class ActionMenuMailSort extends Component {
	handleGroupMailByClick = () => {
		const { conversation, message } = groupMailBy.values;
		const val = this.props.groupBy === conversation ? message : conversation;
		this.props.setGroupMailBy(val);
	};

	render(props) {
		return (
			<ActionMenu label={props[`${props.sortBy}Label`]} anchor="end" >
				<DropDownWrapper>
					<ActionMenuGroup>
						<SortActionMenuItem {...props} sort={SORT_BY.dateDesc}>
							<Text id="mail.sortMenu.dateDesc" />
						</SortActionMenuItem>
						<SortActionMenuItem {...props} sort={SORT_BY.dateAsc}>
							<Text id="mail.sortMenu.dateAsc" />
						</SortActionMenuItem>
						<SortActionMenuItem {...props} sort={SORT_BY.unread}>
							<Text id="mail.sortMenu.unread" />
						</SortActionMenuItem>
						<SortActionMenuItem {...props} sort={SORT_BY.attachDesc}>
							<Text id="mail.sortMenu.attachDesc" />
						</SortActionMenuItem>
						<SortActionMenuItem {...props} sort={SORT_BY.flagDesc}>
							<Text id="mail.sortMenu.flagDesc" />
						</SortActionMenuItem>
						<SortActionMenuItem {...props} sort={SORT_BY.nameAsc}>
							<Text id="mail.sortMenu.nameAsc" />
						</SortActionMenuItem>
						<SortActionMenuItem {...props} sort={SORT_BY.subjAsc}>
							<Text id="mail.sortMenu.subjAsc" />
						</SortActionMenuItem>
					</ActionMenuGroup>
					<ActionMenuGroup>
						<ActionMenuItem
							onClick={this.handleGroupMailByClick}
							icon={
								props.groupBy === groupMailBy.values.conversation ? (
									'check'
								) : null
							}
						>
							<Text id="mail.sortMenu.groupByConversations" />
						</ActionMenuItem>
					</ActionMenuGroup>
					<ActionMenuGroup>
						<ActionMenuItem onClick={props.toggleSettings}>
							<Text id="mail.sortMenu.settings" />
						</ActionMenuItem>
					</ActionMenuGroup>
				</DropDownWrapper>
			</ActionMenu>
		);
	}
}
