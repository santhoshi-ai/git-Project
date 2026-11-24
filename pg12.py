from flask import Flask, request, jsonify

app = Flask(__name__)


products = []

@app.route('/addProduct', methods=['POST'])
def add_product():
    try:
        # Parse JSON body
        data = request.get_json()
        if not data:
            return jsonify({
                "success": False,
                "message": "No JSON payload provided."
            }), 400

        # Validate required fields
        name = data.get("name")
        price = data.get("price")

        if not name or not isinstance(name, str):
            return jsonify({
                "success": False,
                "message": "Product name is required and must be a string."
            }), 400

        if price is None or not isinstance(price, (int, float)) or price < 0:
            return jsonify({
                "success": False,
                "message": "Product price is required and must be a non-negative number."
            }), 400

        # Create product entry
        product = {
            "id": len(products) + 1,
            "name": name.strip(),
            "price": float(price)
        }
        products.append(product)

        return jsonify({
            "success": True,
            "message": "Product added successfully.",
            "product": product
        }), 201

    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"An error occurred: {str(e)}"
        }), 500

@app.route('/products', methods=['GET'])
def get_products():
    return jsonify({
        "success": True,
        "products": products
    }), 200

if __name__ == '__main__':
    
    app.run(debug=True)
