from odoo import models


class Partner(models.Model):
    _inherit = 'res.partner'

    def sending_bus(self):
        data = {"message": "hello websocket"}
        self.env['bus.bus']._sendone(self.env.user.partner_id, 'sample.model/insert', data)
