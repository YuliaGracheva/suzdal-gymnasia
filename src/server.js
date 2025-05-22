const MODE = import.meta.env.MODE || process.env.MODE || 'local';

const configs = {
    local: {
        base: "http://localhost:3004",
    },
    production: {
        base: "http://46.149.69.12",
    },
};

const { base } = configs[MODE] || configs.local;

const api = {
    tables: `${base}/api/admin/tables`,
    tablesName: `${base}/api/admin/tables`,
    getTable: (tableName) => `${base}/api/admin/table/${tableName}`,
    
    addRowTables: (tableName) => `${base}/api/admin/table/${tableName}`,
    getTables: (tableName) => `${base}/api/admin/table/${tableName}`,
    getTableInfo: (tableName) => `${base}/api/admin/table-info/${tableName}`,
    getTablesMeta: (tableName) => `${base}/api/admin/table-meta/${tableName}`,
    deleteTableRow: (tableName, id) => `${base}/api/admin/table/${tableName}/:${id}}`,
    updateTableRow: (tableName, id) => `${base}/api/admin/table/${tableName}/${id}`,
    getColumnsTables: (tableName) => `${base}/api/admin/columns/${tableName}`,
    getForeignKeyTables: (tableName) => `${base}/api/admin/foreign-keys/${tableName}`,

    user: `${base}/api/user`,
    categorydoc: `${base}/api/categorydocument`,
    document: `${base}/api/document`,
    managmentbodies: `${base}/api/managementbodies`,
    olympiad: `${base}/api/olympiad`,
    olympiads: `${base}/api/olympiads`,
    news: `${base}/api/news`,
    subject: `${base}/api/subject`,
    status: `${base}/api/status`,
    message: `${base}/api/message`,

    newsNotArchived: `${base}/api/news/notArchived`,
    newsGetID: (id) => `${base}/api/news/${id}`,

    uploads: `${base}/uploads`,
    addUpload: `${base}/api/upload`,
    getImages: `${base}/api/files/images`,
    getDocuments: `${base}/api/files/documents`,
    deleteUpload: `${base}/api/delete`,
    upload: (fileType) => `${base}/api/files/${fileType === 'image' ? 'images' : 'documents'}`,

    adminUser: `${base}/api/admin/users`,
    addUser: `${base}/api/admin/users`,
    getUser: (id) => `${base}/api/admin/users/${id}`,
    updateUser: (id) => `${base}/api/admin/users/${id}`,

    updatePassword: (id) => `${base}/api/users/${id}/password`,
    resetPassword: (id) => `${base}/api/admin/reset-password`,
    getListPassword: `${base}/api/password-requests`,
    deleteListPassword: (id) => `${base}/api/password-requests/${id}`,

    feedback: `${base}/api/feedback`,
    getFeedback: `${base}/api/admin/feedback`,
    updateFeedback: (id) => `${base}/api/feedback/${id}`,
    deleteFeedback: (id) => `${base}/api/feedback/${id}`,

    login: `${base}/api/admin/login`,
    settings: `${base}/api/settings`,
};

export default api;