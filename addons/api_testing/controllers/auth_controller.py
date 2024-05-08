from odoo import http
from odoo.http import request


class AuthController(http.Controller):
    @http.route('/api/login', type='json', auth='user', cors="*", csrf=False)
    def api_login(self, *args, **kwargs):
        login = kwargs.get('login')
        password = kwargs.get('password')
        uid = http.request.session.authenticate(http.request.session.db, login, password)
        return {"message": "Login Successfully.", "uid": uid}

    @http.route('/api/get-headers', type='json', auth='user', cors="*", csrf=False)
    def api_info(self, *args, **kwargs):
        headers = request.httprequest.headers
        return dict(headers)
