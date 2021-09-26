import logging
import http.server
import socketserver

PORT = 8000
DIRECTORY = "build"

logger = logging.getLogger(__name__)

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def serve():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        logger.info("serving at port", PORT)
        httpd.serve_forever()
