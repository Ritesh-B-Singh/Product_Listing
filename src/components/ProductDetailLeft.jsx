import { Grid, ImageList, ImageListItem } from '@mui/material';
import { useState } from 'react'

const ProductDetailLeft = (product) => {
    const [selectedImage, setSelectedImage] = useState(product.product.images[0]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

  return (
      <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
              <ImageList sx={{ width: '100%', height: '100%', flexWrap: 'nowrap', overflow: 'auto' }} cols={1}>
                  {product.product.images.map((item, index) => (
                      <ImageListItem
                          key={index}
                          onClick={() => handleImageClick(item)}
                          sx={{
                              cursor: 'pointer',
                              border: item === selectedImage ? '2px solid #fb6d6a' : 'none',
                              width: '100px',
                              height: '100px',
                              mb: 1,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: '4px',
                          }}
                      >
                          <img
                              src={item}
                              alt={product.title}
                              loading="lazy"
                              style={{
                                  width: '80px',
                                  height: '80px',
                                  objectFit: 'fill',
                                  borderRadius: item === selectedImage ? '4px' : 'none',
                                  boxShadow: item === selectedImage ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
                                  transition: 'transform 0.3s ease-in-out'
                              }}
                              onMouseEnter={(e) => {
                                  e.target.style.transform = 'scale(1.05)';
                              }}
                              onMouseLeave={(e) => {
                                  e.target.style.transform = 'scale(1)';
                              }}
                          />
                      </ImageListItem>
                  ))}
              </ImageList>
          </Grid>
          <Grid item xs={12} sm={8}>
              <img
                  src={selectedImage}
                  alt="Product main image"
                  style={{
                      width: '100%',
                      height: '500px',
                      objectFit: 'fill',
                      borderRadius: '4px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  }}
              />
          </Grid>
      </Grid>
  )
}

export default ProductDetailLeft