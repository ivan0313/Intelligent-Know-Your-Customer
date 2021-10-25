import json

from PyQt5.QtCore import QObject, pyqtSlot
from ..utils.serializer import jsonify
from ..queries import accounts

class Accounts(QObject):
    def __init__(self, parent=None):
        super().__init__(parent)

    @pyqtSlot(str, result=str)
    def list_accounts(self, req):
        params = json.loads(req)
        print('query variables', params)

        user_id = params.get('userId')
        username = params.get('username') or None
        result = accounts.list_accounts(user_id=user_id, username=username)
        
        return jsonify(result)