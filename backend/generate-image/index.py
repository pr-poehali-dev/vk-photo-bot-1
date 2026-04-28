import json
import os
import requests
import base64
import boto3
import uuid


def handler(event: dict, context) -> dict:
    """Генерация фото товара через Hugging Face и сохранение в S3"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    raw_body = event.get('body') or '{}'
    body = json.loads(raw_body)
    prompt = body.get('prompt', '')

    if not prompt:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Введите описание товара'})
        }

    hf_token = os.environ['HUGGINGFACE_API_KEY']
    api_url = 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell'

    full_prompt = f"professional product photo, white background, high quality, commercial photography, {prompt}"

    response = requests.post(
        api_url,
        headers={'Authorization': f'Bearer {hf_token}'},
        json={'inputs': full_prompt},
        timeout=60
    )

    if response.status_code != 200:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка генерации: {response.text}'})
        }

    image_bytes = response.content

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )

    file_key = f'product-photos/{uuid.uuid4()}.png'
    s3.put_object(Bucket='files', Key=file_key, Body=image_bytes, ContentType='image/png')

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{file_key}"

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'url': cdn_url})
    }