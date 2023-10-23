from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)


@app.route('/')
def root():
    return jsonify({'message': 'Welcome to the API!'})


@app.route('/upload', methods=['POST'])
def upload():
    print(request.headers.get('Content-Type'))
    if request.headers.get('Content-Type') == 'application/octet-stream':
        bytes = request.data
        base_url = request.headers.get('Base-Url')
        # print(request.data)
        response = requests.post(
            f'{base_url}/api/codex/v1/upload',
            data=bytes,
            headers={
                'Content-Type': 'application/octet-stream'
            })
        print(response.status_code)
        print(response.text)
        return jsonify({'cid': response.text.strip()})
    else:
        return jsonify({'message': 'Error!'})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
