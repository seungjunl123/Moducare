#!/usr/bin/python3

import io
import logging
import socketserver
from http import server
from threading import Condition

from picamera2 import Picamera2
from picamera2.encoders import JpegEncoder
from picamera2.outputs import FileOutput
from libcamera import controls

PAGE = """\
<html>
<head>
</head>
<body>
<img src="stream.mjpg" width="100%" height="auto" />
</body>
</html>
"""
# PAGE = """\
# <html>
# <head>
# </head>
# <body>
# <img src="stream.mjpg" width="auto" height="auto" />
# </body>
# </html>
# """

class StreamingOutput(io.BufferedIOBase):
    def __init__(self):
        self.frame = None
        self.condition = Condition()

    def write(self, buf):
        with self.condition:
            self.frame = buf
            self.condition.notify_all()

class StreamingHandler(server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_response(301)
            self.send_header('Location', '/index.html')
            self.send_header('Access-Control-Allow-Origin', 'http://10.0.2.2:3000')
            self.end_headers()
        elif self.path == '/index.html':
            content = PAGE.encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.send_header('Content-Length', len(content))
            self.send_header('Access-Control-Allow-Origin', 'http://10.0.2.2:3000')
            self.end_headers()
            self.wfile.write(content)
        elif self.path == '/stream.mjpg':
            self.send_response(200)
            self.send_header('Age', 0)
            self.send_header('Cache-Control', 'no-cache, private')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Content-Type', 'multipart/x-mixed-replace; boundary=FRAME')
            self.send_header('Access-Control-Allow-Origin', 'http://10.0.2.2:3000')
            self.end_headers()
            try:
                while True:
                    with output.condition:
                        output.condition.wait()
                        frame = output.frame
                    self.wfile.write(b'--FRAME\r\n')
                    self.send_header('Content-Type', 'image/jpeg')
                    self.send_header('Content-Length', len(frame))
                    self.end_headers()
                    self.wfile.write(frame)
                    self.wfile.write(b'\r\n')
            except Exception as e:
                logging.warning(
                    'Removed streaming client %s: %s',
                    self.client_address, str(e))
        else:
            self.send_error(404)
            self.end_headers()

class StreamingServer(socketserver.ThreadingMixIn, server.HTTPServer):
    allow_reuse_address = True
    daemon_threads = True

# 카메라 초기화
picam2 = Picamera2()

# 카메라 설정 (자동 초점 모드 포함)
picam2.configure(picam2.create_video_configuration(main={"size": (640, 480)}))
picam2.set_controls({"AfMode": controls.AfModeEnum.Continuous})
# picam2.set_controls({"AfMode": controls.AfModeEnum.Manual, "LensPosition": 50.0})

# 카메라 스트리밍 시작
output = StreamingOutput()
picam2.start_recording(JpegEncoder(), FileOutput(output))

try:
    address = ('', 8000)
    server = StreamingServer(address, StreamingHandler)
    server.serve_forever()
finally:
    picam2.stop_recording()

