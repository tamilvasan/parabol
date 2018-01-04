import {getUserId} from 'server/utils/authorization';

export const resolveAgendaItem = ({agendaItemId, agendaItem}, args, {dataLoader}) => {
  return agendaItemId ? dataLoader.get('agendaItems').load(agendaItemId) : agendaItem;
};

export const resolveInvitation = ({invitationId, invitation}, args, {dataLoader}) => {
  return invitationId ? dataLoader.get('invitations').load(invitationId) : invitation;
};

export const resolveInvitations = ({invitationIds, invitations}, args, {dataLoader}) => {
  return (invitationIds && invitationIds.length > 0) ?
    dataLoader.get('invitations').loadMany(invitationIds) : invitations;
};

export const resolveNotification = ({notificationId, notification}, args, {dataLoader}) => {
  return notificationId ? dataLoader.get('notifications').load(notificationId) : notification;
};

export const resolveNotifications = ({notificationIds, notifications}, args, {dataLoader}) => {
  return (notificationIds && notificationIds.length > 0) ?
    dataLoader.get('notifications').loadMany(notificationIds) : notifications;
};

export const resolveOrganization = ({orgId, organization}, args, {dataLoader}) => {
  return orgId ? dataLoader.get('organizations').load(orgId) : organization;
};

export const resolveOrgApproval = ({orgApprovalId, orgApproval}, args, {dataLoader}) => {
  return orgApprovalId ? dataLoader.get('orgApprovals').load(orgApprovalId) : orgApproval;
};

export const resolveProject = ({project, projectId}, args, {dataLoader}) => {
  return projectId ? dataLoader.get('projects').load(projectId) : project;
};

export const resolveProjects = ({projectIds, projects}, args, {dataLoader}) => {
  return (projectIds && projectIds.length > 0) ? dataLoader.get('projects').loadMany(projectIds) : projects;
};

export const resolveTeam = ({team, teamId}, args, {dataLoader}) => {
  return teamId ? dataLoader.get('teams').load(teamId) : team;
};

export const resolveTeams = ({teamIds, teams}, args, {dataLoader}) => {
  return (teamIds && teamIds.length > 0) ? dataLoader.get('teams').loadMany(teamIds) : teams;
};

export const resolveTeamMember = ({teamMemberId, teamMember}, args, {dataLoader}) => {
  return teamMemberId ? dataLoader.get('teamMembers').load(teamMemberId) : teamMember;
};

export const resolveTeamMembers = ({teamMemberIds, teamMembers}, args, {dataLoader}) => {
  return (teamMemberIds && teamMemberIds.length > 0) ?
    dataLoader.get('teamMembers').loadMany(teamMemberIds) : teamMembers;
};

export const resolveUser = ({userId, user}, args, {dataLoader}) => {
  return userId ? dataLoader.get('users').load(userId) : user;
};


/* Special resolvesr */
export const resolveIfViewer = (ifViewerField, defaultValue) => (source, args, {authToken}) => {
  return source.userId === getUserId(authToken) ? source[ifViewerField] : defaultValue;
};

export const resolveTypeForViewer = (selfPayload, otherPayload) => ({userId}, {authToken}) => {
  return userId === getUserId(authToken) ? selfPayload : otherPayload;
};