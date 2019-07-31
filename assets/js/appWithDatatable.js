require.config({
    baseUrl: "/public/js",
    paths: {
        babel: '../js/babel.min',
        jsx: '../js/jsx',
        react: '../js/react',
        'jquery': '../js/jquery-3.4.1.min',
        'bootstrap': '../js/bootstrap.min',
        'popper': '../convex/vendors/js/core/popper.min',
        datatables: '../convex/vendors/js/datatable/datatables.min',
        'datatables.net-buttons-bs': '../convex/vendors/js/datatable/dataTables.buttons.min',
        'datatables.net-responsive-bs': '../convex/vendors/js/datatable/dataTables.responsive.min',
        'datatables.net-buttons-flash-bs': '../convex/vendors/js/datatable/buttons.flash.min',
        'datatables.net-buttons-html5-bs': '../convex/vendors/js/datatable/buttons.html5.min',
        'datatables.net-buttons-print-bs': '../convex/vendors/js/datatable/buttons.print.min',
        'jzip': '../convex/vendors/js/datatable/jszip.min',
        'pdfmake': '../convex/vendors/js/datatable/pdfmake.min',
        'vfs_fonts': '../convex/vendors/js/datatable/vfs_fonts',
    },
    shim: {
        'jquery': {
            exports: 'jquery'
        },
        'popper': {
            exports: 'popper'
        },
        'bootstrap': {
            deps: ['jquery','popper'],
            exports: 'Bootstrap'
        },
        'datatables': {
            deps: ['jquery', 'bootstrap']
        },
        'script': {
            deps: ['datatables']
        }
    },
    jsx: {
        fileExtension: '.js',
    },
    config: {
        babel: {
            sourceMaps: "inline",
        }
    }
});