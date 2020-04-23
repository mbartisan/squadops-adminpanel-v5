export default function makeV5ApiService({ request }) {

    const users = Object.freeze({
        list: (reqOpts)                                    => req(`/users`, null, { method: "GET", ...reqOpts }),
        create: ({ name, email, password }, reqOpts)   => req(`/users`, { name, email, password }, { method: "POST", ...reqOpts }),
        retrieve: (id, reqOpts)                              => req(`/users/${id}`, null, { method: "GET", ...reqOpts }),
        update: (id, { name, email, password }, reqOpts) => req(`/users/${id}`, { name, email, password }, { method: "PATCH", ...reqOpts }),
        me: Object.freeze({
            retrieve: (reqOpts) => req(`/users/@me`, null, { method: "GET", ...reqOpts }),
            // update: ({ name, email, steam64, discordId, password }, reqOpts) => req(`/users/@me`, { name, email, steam64, discordId, password }, { method: "PATCH", ...reqOpts }),
            login: ({ userId, email, password }, reqOpts)   => req(`/users/login`, { userId, email, password }, { method: "POST", ...reqOpts }),
            logout: (reqOpts)   => req(`/users/@me/logout`, null, { method: "POST", ...reqOpts }),
        }),
        login: ({ userId, email, password }, reqOpts)   => req(`/users/login`, { userId, email, password }, { method: "POST", ...reqOpts }),
        logout: (reqOpts)   => req(`/users/@me/logout`, null, { method: "POST", ...reqOpts }),
        linkedAccounts: Object.freeze({
            list: (userId, reqOpts)                           => req(`/users/${userId}/linked-accounts`, null, { method: "GET", ...reqOpts }),
            create: (userId, { key, value }, reqOpts)                           => req(`/users/${userId}/linked-accounts`, { key, value }, { method: "GET", ...reqOpts }),
            retrieve: (userId, key, reqOpts)                           => req(`/users/${userId}/linked-accounts/${key}`, null, { method: "GET", ...reqOpts }),
            update: (userId, key, { value }, reqOpts)                           => req(`/users/${userId}/linked-accounts/${key}`, { value }, { method: "PATCH", ...reqOpts }),
            // remove: (userId, reqOpts)                           => req(`/users/${userId}/linked-accounts`, null, { method: "GET", ...reqOpts }),
        }),
        orgs: Object.freeze({
            list: (userId, reqOpts)                           => req(`/users/${userId}/orgs`, null, { method: "GET", ...reqOpts }),
        }),
    });

    const orgs = Object.freeze({
        list: (reqOpts)                                           => req(`/orgs`, null, { method: "GET", ...reqOpts }),
        create: ({ name, ownerId }, reqOpts)                      => req(`/orgs`, { name, ownerId }, { method: "POST", ...reqOpts }),
        retrieve: (orgId, reqOpts = {})                              => req(`/orgs/${orgId}`, null, { method: "GET", ...reqOpts }),
        update: (orgId, { name, ownerId }, reqOpts = {})             => req(`/orgs/${orgId}`, { name, ownerId }, { method: "PATCH", ...reqOpts }),
        members: Object.freeze({
            list: (orgId, reqOpts = {})                           => req(`/orgs/${orgId}/members`, null, { method: "GET", ...reqOpts }),
            create: (orgId, { userId, roleId }, reqOpts = {})     => req(`/orgs/${orgId}/members`, { userId, roleId }, { method: "POST", ...reqOpts }),
            // retrieve: (orgId, userId, reqOpts = {})               => req(`/orgs/${orgId}/members/${userId}`, null, { method: "GET", ...reqOpts }),
            update: (orgId, userId, { roleId }, reqOpts = {})     => req(`/orgs/${orgId}/members/${userId}`, { roleId }, { method: "PATCH", ...reqOpts }),
            remove: (orgId, userId, reqOpts = {})                 => req(`/orgs/${orgId}/members/${userId}`, null, { method: "DELETE", ...reqOpts }),
        }),
        roles: Object.freeze({
            list: (orgId, reqOpts = {})                           => req(`/orgs/${orgId}/roles`, null, { method: "GET", ...reqOpts }),
            create: (orgId, { name }, reqOpts = {})     => req(`/orgs/${orgId}/roles`, { name }, { method: "POST", ...reqOpts }),
            retrieve: (orgId, roleId, reqOpts = {})               => req(`/orgs/${orgId}/roles/${roleId}`, null, { method: "GET", ...reqOpts }),
            update: (orgId, roleId, { name }, reqOpts = {})     => req(`/orgs/${orgId}/roles/${roleId}`, { name }, { method: "PATCH", ...reqOpts }),
            // remove: (orgId, roleId, reqOpts = {})                 => req(`/orgs/${orgId}/roles/${roleId}`, null, { method: "DELETE", ...reqOpts }),
            members: Object.freeze({
                list: (orgId, roleId, reqOpts = {})                           => req(`/orgs/${orgId}/roles/${roleId}/members`, null, { method: "GET", ...reqOpts }),
            }),
        }),
        tags: Object.freeze({
            list: (orgId, reqOpts = {})                           => req(`/orgs/${orgId}/tags`, null, { method: "GET", ...reqOpts }),
            create: (orgId, { name }, reqOpts = {})     => req(`/orgs/${orgId}/tags`, { name }, { method: "POST", ...reqOpts }),
            retrieve: (orgId, tagId, reqOpts = {})               => req(`/orgs/${orgId}/tags/${tagId}`, null, { method: "GET", ...reqOpts }),
            update: (orgId, tagId, { name }, reqOpts = {})     => req(`/orgs/${orgId}/tags/${tagId}`, { name }, { method: "PATCH", ...reqOpts }),
            // remove: (orgId, tagId, reqOpts = {})                 => req(`/orgs/${orgId}/tags/${tagId}`, null, { method: "DELETE", ...reqOpts }),
            members: Object.freeze({
                list: (orgId, tagId, reqOpts = {})                           => req(`/orgs/${orgId}/tags/${tagId}/members`, null, { method: "GET", ...reqOpts }),
                create: (orgId, tagId, { userId }, reqOpts = {})     => req(`/orgs/${orgId}/tags/${tagId}/members`, { userId }, { method: "POST", ...reqOpts }),
                remove: (orgId, tagId, userId, reqOpts = {})                 => req(`/orgs/${orgId}/tags/${tagId}/members/${userId}`, null, { method: "DELETE", ...reqOpts }),
            }),
        }),
        teams: Object.freeze({
            list: (orgId, reqOpts = {})                           => req(`/orgs/${orgId}/teams`, null, { method: "GET", ...reqOpts }),
            create: (orgId, { name }, reqOpts = {})     => req(`/orgs/${orgId}/teams`, { name }, { method: "POST", ...reqOpts }),
            retrieve: (orgId, teamId, reqOpts = {})               => req(`/orgs/${orgId}/teams/${teamId}`, null, { method: "GET", ...reqOpts }),
            update: (orgId, teamId, { name }, reqOpts = {})     => req(`/orgs/${orgId}/teams/${teamId}`, { name }, { method: "PATCH", ...reqOpts }),
            // remove: (orgId, teamId, reqOpts = {})                 => req(`/orgs/${orgId}/teams/${teamId}`, null, { method: "DELETE", ...reqOpts }),
            members: Object.freeze({
                list: (orgId, teamId, reqOpts = {})                           => req(`/orgs/${orgId}/teams/${teamId}/members`, null, { method: "GET", ...reqOpts }),
                create: (orgId, teamId, { userId, isLeader }, reqOpts = {})     => req(`/orgs/${orgId}/teams/${teamId}/members`, { userId, isLeader }, { method: "POST", ...reqOpts }),
                update: (orgId, teamId, userId, { isLeader }, reqOpts = {})             => req(`/orgs/${orgId}/teams/${teamId}/members/${userId}`, { isLeader }, { method: "PATCH", ...reqOpts }),
                remove: (orgId, teamId, userId, reqOpts = {})                 => req(`/orgs/${orgId}/teams/${teamId}/members/${userId}`, null, { method: "DELETE", ...reqOpts }),
            }),
        }),
    });

    const events = Object.freeze({
        list: (reqOpts = {}) => req(`/events`, null, { method: "GET", ...reqOpts }),
        create: ({
                     orgId,
                     name,
                     body,
                     startAt,
                     endAt,
                     registrationStartAt,
                     registrationEndAt,
                     isPublished,
                     registrationSections,
                 }, reqOpts) => req(`/events`, {
            orgId,
            name,
            body,
            startAt,
            endAt,
            registrationStartAt,
            registrationEndAt,
            isPublished,
            registrationSections,
        }, { method: "POST", ...reqOpts }),
        retrieve: (id, reqOpts = {}) => req(`/events/${id}`, null, { method: "GET", ...reqOpts }),
        update: (id, {
            name,
            body,
            startAt,
            endAt,
            registrationStartAt,
            registrationEndAt,
            isPublished,
            registrationSections,
        }, reqOpts = {}) => req(`/events/${id}`, {
            name,
            body,
            startAt,
            endAt,
            registrationStartAt,
            registrationEndAt,
            isPublished,
            registrationSections,
        }, { method: "PATCH", ...reqOpts }),
        registrationSections: Object.freeze({
            list: (eventId, reqOpts = {}) => req(`/events/${eventId}/registration-sections`, null, { method: "GET", ...reqOpts }),
            create: (eventId, {
                name,
                registrationLimit,
                useWaitlist,
                sort
            }, reqOpts = {}) => req(`/events/${eventId}/registration-sections`, { name, registrationLimit, useWaitlist, sort }, { method: "POST", ...reqOpts }),
            retrieve: (eventId, sectionId, reqOpts = {})    => req(`/events/${eventId}/registration-sections/${sectionId}`, null, { method: "GET", ...reqOpts }),
            update: (eventId, sectionId, {
                name,
                registrationLimit,
                useWaitlist,
                sort
            }, reqOpts = {}) => req(`/events/${eventId}/registration-sections/${sectionId}`, { name, registrationLimit, useWaitlist, sort }, { method: "PATCH", ...reqOpts }),
            registrations: Object.freeze({
                list: (eventId, sectionId, reqOpts = {}) => req(`/events/${eventId}/registration-sections/${sectionId}/registrations`, null, { method: "GET", ...reqOpts }),
                create: (eventId, sectionId, {} = {}, reqOpts = {}) => req(`/events/${eventId}/registration-sections/${sectionId}/registrations`, null, { method: "POST", ...reqOpts }),
                retrieve: (eventId, sectionId, registrationId, reqOpts = {}) => req(`/events/${eventId}/registration-sections/${sectionId}/registrations/${registrationId}`, null, { method: "GET", ...reqOpts }),
                update: (eventId, sectionId, registrationId, { isUnregistered, didAttend }, reqOpts = {}) => req(`/events/${eventId}/registration-sections/${sectionId}/registrations/${registrationId}`, { isUnregistered, didAttend }, { method: "PATCH", ...reqOpts }),
                // remove: (eventId, sectionId, registrationId, reqOpts = {}) => req(`/events/${eventId}/registration-sections/${sectionId}/registrations/${registrationId}`, null, { method: "DELETE", ...reqOpts }),
            }),
        }),
        registrations: Object.freeze({
            list: (eventId, sectionId, reqOpts = {}) => req(`/events/${eventId}/registrations`, null, { method: "GET", ...reqOpts }),
            create: (eventId, sectionId, {} = {}, reqOpts = {}) => req(`/events/${eventId}/registrations`, null, { method: "POST", ...reqOpts }),
            retrieve: (eventId, sectionId, registrationId, reqOpts = {}) => req(`/events/${eventId}/registrations/${registrationId}`, null, { method: "GET", ...reqOpts }),
            update: (eventId, sectionId, registrationId, { isUnregistered, didAttend }, reqOpts = {}) => req(`/events/${eventId}/registrations/${registrationId}`, { isUnregistered, didAttend }, { method: "PATCH", ...reqOpts }),
            // remove: (eventId, sectionId, registrationId, reqOpts = {}) => req(`/events/${eventId}/registrations/${registrationId}`, null, { method: "DELETE", ...reqOpts }),
        }),
    });

    const registrationTemplates = Object.freeze({
        list: (reqOpts = {})                                 => req(`/registration-templates`, null, { method: "GET", ...reqOpts }),
        create: ({ orgId, name, template }, reqOpts = {})    => req(`/registration-templates`, { orgId, name, template }, { method: "POST", ...reqOpts }),
        retrieve: (id, reqOpts = {})                         => req(`/registration-templates/${id}`, null, { method: "GET", ...reqOpts }),
        update: (id, { name, template }, reqOpts = {})       => req(`/registration-templates/${id}`, { name, template }, { method: "PATCH", ...reqOpts }),
        // remove: (id, reqOpts)                           => req(`/registration-templates/${id}`, null, { method: "DELETE", ...reqOpts }),
    });

    return Object.freeze({
        users,
        orgs,
        events,
        registrationTemplates,
        login: users.login,
        logout: users.logout
    });

    function req(url, data, req) {
        return new Promise((resolve, reject) => {
            request(`/v5` + url, data, req)
                .then(response => resolve(response.data))
                .catch(err => reject(err));
        });
    }
}


